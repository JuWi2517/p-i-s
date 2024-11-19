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
    const conn = await pool.getConnection();
    try {
        console.log('orderData:', orderData); // Log orderData

        const sql = `INSERT INTO orders (user_id, order_date, status, total_price_kc, total_price_eu) VALUES (?, ?, ?, ?, ?)`;
        const orderDate = new Date(orderData.order_date).toISOString().slice(0, 19).replace('T', ' ');
        const [result] = await conn.query(sql, [orderData.user_id, orderDate, orderData.status, orderData.total_price_kc, orderData.total_price_eu]);

        const orderId = result.insertId;
        const orderItemsSql = `INSERT INTO orderitems (order_id, product_id, quantity, total_price_kc, total_price_eu) VALUES ?`;
        const orderItemsData = orderData.items.map(item => [
            orderId, 
            item.productId, 
            item.quantity, 
            item.totalPrice, 
            item.totalPrice * 0.04
        ]);

        console.log('orderItemsData:', orderItemsData); // Log orderItemsData

        await conn.query(orderItemsSql, [orderItemsData]);

        return result;
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
