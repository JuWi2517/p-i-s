const pool = require('../db');

// Retrieve all orders
async function getAllOrders() {
    const conn = await pool.getConnection();
    try {
        const sql = `
            SELECT orders.id, orders.user_id, orders.order_date, orders.status
            FROM orders;
        `;
        const rows = await conn.query(sql);
        return rows;
    } finally {
        conn.release();
    }
}

// Create a new order
async function createOrder(orderData) {
    const conn = await pool.getConnection();
    try {
        const sql = `INSERT INTO orders (user_id, order_date, status, total_price_kc, total_price_eu) VALUES (?, ?, ?, ?, ?)`;
        const orderDate = new Date(orderData.order_date).toISOString().slice(0, 19).replace('T', ' ');
        const [result] = await conn.query(sql, [orderData.user_id, orderDate, orderData.status, orderData.total_price_kc, orderData.total_price_eu]);

        return result;
    } catch (error) {
        // Handle the error silently
        return null; // Return null or any other appropriate value
    } finally {
        conn.release();
    }
}

// Update the status of an order
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

module.exports = { getAllOrders, createOrder, updateOrderStatus };