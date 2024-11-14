import React from 'react';
import { placeOrder } from '../api/api';

function Cart({ cart }) {
    const handlePlaceOrder = async () => {
        try {
            const response = await placeOrder(cart);
            alert('Order placed successfully!');
        } catch (error) {
            alert('Failed to place order!');
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>{item.name} - {item.price_kc} Kč</li>
                ))}
            </ul>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;
