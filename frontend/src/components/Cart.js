import React, { useContext } from 'react';
import { placeOrder } from '../api/api';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

function Cart() {
    const { cart } = useContext(CartContext);
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
            total_price_eu
        };

        try {
            const response = await placeOrder(orderData);
            alert('Order placed successfully!');
        } catch (error) {
            alert('Failed to place order!');
        }
    };

    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += parseFloat(item.price_kc) * item.quantity;
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
                        {item.name} - {item.quantity}x {item.price_kc} Kč = {item.totalPrice} Kč ({(item.totalPrice * 0.04).toFixed(2)} €)
                    </li>
                ))}
            </ul>
            <h3>Total Price: {totalCartPriceKc} Kč ({totalCartPriceEu.toFixed(2)} €)</h3>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;