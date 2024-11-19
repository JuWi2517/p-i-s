import React, { useContext } from 'react';
import { placeOrder, updateProduct } from '../api/api';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

function Cart() {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const handlePlaceOrder = async () => {
        // Calculate total prices
        const total_price_kc = cart.reduce((total, item) => total + parseFloat(item.price_kc) * (item.quantity || 1), 0);
        const total_price_eu = total_price_kc * 0.04; // Assuming 1 Kč = 0.04 €

        const orderData = {
            user_id: user.id,
            order_date: new Date().toISOString(),
            status: 'processing',
            total_price_kc,
            total_price_eu,
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity || 1,
                price_kc: item.price_kc
            }))
        };

        try {
            const response = await placeOrder(orderData);
            if (response) {
                // Update product stock
                const productUpdates = cart.reduce((acc, item) => {
                    if (!acc[item.id]) {
                        acc[item.id] = { ...item, quantity: 0 };
                    }
                    acc[item.id].quantity += item.quantity || 1;
                    return acc;
                }, {});

                for (const itemId in productUpdates) {
                    const item = productUpdates[itemId];
                    const updatedStock = item.stock - item.quantity;
                    await updateProduct(item.id, { ...item, stock: updatedStock });
                }

                clearCart(); // Clear the cart after placing the order
                alert('Order placed successfully!');
            } else {
                alert('Failed to place order!');
            }
        } catch (error) {
            console.error('Error placing order:', error); // Log error
            alert('Failed to place order!');
        }
    };

    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
            existingItem.totalPrice += parseFloat(item.price_kc) * (item.quantity || 1);
        } else {
            acc.push({
                ...item,
                quantity: item.quantity || 1,
                totalPrice: parseFloat(item.price_kc) * (item.quantity || 1)
            });
        }
        return acc;
    }, []);

    // Calculate total prices for the entire cart
    const totalCartPriceKc = groupedCart.reduce((total, item) => total + item.totalPrice, 0);
    const totalCartPriceEu = totalCartPriceKc * 0.04; // Assuming 1 Kč = 0.04 €

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {groupedCart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity}x {item.price_kc} Kč = {item.totalPrice.toFixed(2)} Kč ({(item.totalPrice * 0.04).toFixed(2)} €)
                    </li>
                ))}
            </ul>
            <h3>Total Price: {totalCartPriceKc.toFixed(2)} Kč ({totalCartPriceEu.toFixed(2)} €)</h3>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;