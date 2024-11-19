const orderModel = require('../models/orderModel');

// Retrieve all orders
async function getOrders(req, res) {
    try {
        const orders = await orderModel.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
}

// Create a new order
async function createOrder(req, res) {
    const orderData = req.body;

    if (!orderData || !orderData.user_id || !orderData.items || !orderData.items.length) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    // Validate item properties
    for (const item of orderData.items) {
        if (typeof item.price_kc !== 'number' || typeof item.quantity !== 'number') {
            return res.status(400).json({ message: 'Invalid item data' });
        }
        item.totalPrice = item.price_kc * item.quantity; // Calculate totalPrice for each item
    }

    // Calculate total prices
    orderData.total_price_kc = orderData.items.reduce((total, item) => total + item.totalPrice, 0);
    orderData.total_price_eu = orderData.total_price_kc * 0.04; // Assuming 1 Kč = 0.04 €

    try {
        await orderModel.createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order' });
    }
}

module.exports = { getOrders, createOrder, updateOrderStatus };

// Update order status
async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await orderModel.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
}

module.exports = { getOrders, createOrder, updateOrderStatus };