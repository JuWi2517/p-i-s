const orderModel = require('../models/orderModel'); // Your order model

// Retrieve all orders
async function getOrders(req, res) {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
}

// Create a new order
async function createOrder(req, res) {
    const orderData = req.body;
    await orderModel.createOrder(orderData);
    res.status(201).json({ message: 'Order created successfully' });
}

// Update order status
async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    await orderModel.updateOrderStatus(id, status);
    res.json({ message: 'Order status updated' });
}

module.exports = { getOrders, createOrder, updateOrderStatus };
