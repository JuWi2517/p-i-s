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

async function updateProduct(id, data) {
    const { name, description, category, price_kc, price_eur, stock, image_path } = data;
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = `
            UPDATE products
            SET name = ?, description = ?, category = ?, price_kc = ?, price_eur = ?, stock = ?, image_path = ?
            WHERE id = ?
        `;
        const result = await conn.query(sql, [name, description, category, price_kc, price_eur, stock, image_path, id]);

        if (result.affectedRows === 0) {
            throw new Error(`Product with id ${id} not found`);
        }

    } finally {
        if (conn) conn.release();
    }
}

async function getProductById(id) {
    const conn = await pool.getConnection();
    try {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await conn.query(sql, [id]);
        
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        } else if (typeof rows === 'object' && rows !== null) {
            return rows;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching product with id: ${id}`, error);
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, getProductById };
