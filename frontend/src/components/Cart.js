import React, { useContext } from 'react';
import { placeOrder, updateProduct } from '../api/api';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';
import { CurrencyContext } from './CurrencyContext';
import '../css/Cart.css';

function Cart() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { currency } = useContext(CurrencyContext);

    const handlePlaceOrder = async () => {
        const total_price_kc = cart.reduce((total, item) => total + parseFloat(item.price_kc) * (item.quantity || 1), 0);
        const total_price_eu = total_price_kc * 0.04;

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

                clearCart();
                alert('Order placed successfully!');
            } else {
                alert('Failed to place order!');
            }
        } catch (error) {
            console.error('Error placing order:', error);
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

    const totalCartPriceKc = groupedCart.reduce((total, item) => total + item.totalPrice, 0);
    const totalCartPriceEu = totalCartPriceKc * 0.04;

    return (
        <div className="cart-container">
            <h2 className="cart-header">Your Shopping Cart</h2>
            <ul className="cart-items">
                {groupedCart.map((item, index) => (
                    <li key={index} className="cart-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-details">
                            {item.quantity}x {currency === 'CZK' ? `${item.price_kc} Kč` : `${(item.price_kc * 0.04).toFixed(2)} €`} = {currency === 'CZK' ? `${item.totalPrice.toFixed(2)} Kč` : `${(item.totalPrice * 0.04).toFixed(2)} €`}
                        </span>
                        <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3 className="cart-total">
                Total Price: {currency === 'CZK' ? `${totalCartPriceKc.toFixed(2)} Kč` : `${totalCartPriceEu.toFixed(2)} €`}
            </h3>
            <button className="cart-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;