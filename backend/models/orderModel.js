const pool = require('../db'); 

// Retrieve all orders
async function getAllOrders() {
    const conn = await pool.getConnection();
    try {
        const sql = `
            SELECT orders.id, orders.user_id, orders.order_date, orders.status, 
                   JSON_ARRAYAGG(JSON_OBJECT('product_id', orderitems.product_id, 'quantity', orderitems.quantity, 'total_price_kc', orderitems.total_price_kc, 'total_price_eur', orderitems.total_price_eur)) AS items
            FROM orders
            LEFT JOIN orderitems ON orders.id = orderitems.order_id
            GROUP BY orders.id;
        `;
        const rows = await conn.query(sql);
        return rows;
    } finally {
        conn.release();
    }
}

// Create a new order
async function createOrder(orderData) {
    const { user_id, items } = orderData;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Insert order record
        const sqlOrder = `INSERT INTO orders (user_id, order_date, status) VALUES (?, NOW(), 'processing')`;
        const [orderResult] = await conn.query(sqlOrder, [user_id]);
        const orderId = orderResult.insertId;

        // Insert order items
        const sqlItems = `INSERT INTO orderitems (order_id, product_id, quantity, total_price_kc, total_price_eur) VALUES ?`;
        const itemValues = items.map(item => [
            orderId,
            item.product_id,
            item.quantity,
            item.total_price_kc,
            item.total_price_eur,
        ]);

        await conn.query(sqlItems, [itemValues]);
        await conn.commit();

        return { orderId };
    } catch (error) {
        await conn.rollback();
        throw error;
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
