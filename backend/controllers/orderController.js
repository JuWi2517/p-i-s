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

    console.log('Received orderData:', orderData); // Log received orderData

    if (!orderData || !orderData.user_id || !orderData.items || !orderData.items.length) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    // Validate and log item properties
    for (const item of orderData.items) {
        console.log('Processing item:', item); // Log item before validation
        if (typeof item.price_kc !== 'number' || typeof item.quantity !== 'number') {
            console.error('Invalid item data:', item);
            return res.status(400).json({ message: 'Invalid item data' });
        }
        item.totalPrice = item.price_kc * item.quantity; // Calculate totalPrice for each item
        console.log('Item after calculation:', item); // Log item after calculation
    }

    // Calculate total prices
    orderData.total_price_kc = orderData.items.reduce((total, item) => total + item.totalPrice, 0);
    orderData.total_price_eu = orderData.total_price_kc * 0.04; // Assuming 1 Kč = 0.04 €

    console.log('Calculated total_price_kc:', orderData.total_price_kc); // Log total_price_kc
    console.log('Calculated total_price_eu:', orderData.total_price_eu); // Log total_price_eu

    console.log('Final orderData before saving:', orderData); // Log final orderData before saving

    try {
        await orderModel.createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    } finally {
        conn.release();
    }
}

// Update order status
async function updateOrderStatus(id, status) {
    const conn = await pool.getConnection();
    try {
        const sql = `UPDATE orders SET status = ? WHERE id = ?`;
        const [result] = await conn.query(sql, [status, id]);
        if (result.affectedRows === 0) {
            throw new Error(`Order with id ${id} not found`);
        }
        return result;
    } finally {
        conn.release();
    }
}



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
