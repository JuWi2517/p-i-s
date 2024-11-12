const pool = require('../db');

async function getAllProducts() {
    const conn = await pool.getConnection();
    const sql = 'SELECT * FROM products';
    const rows = await conn.query(sql);
    conn.release();
    return rows;
}

async function createProduct(data) {
    const { name, description, category, price_kc, price_eur, stock, image_path } = data;
    const conn = await pool.getConnection();
    const sql = 'INSERT INTO products (name, description, category, price_kc, price_eur, stock, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await conn.query(sql, [name, description, category, price_kc, price_eur, stock, image_path]);
    conn.release();
}

module.exports = { getAllProducts, createProduct };
