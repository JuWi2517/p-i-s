const pool = require('../db');

// Retrieve all products
async function getAllProducts() {
    const conn = await pool.getConnection();
    const sql = 'SELECT * FROM products';
    const rows = await conn.query(sql);
    conn.release();
    return rows;
}

// Create a new product
async function createProduct(data) {
    const { name, description, category, price_kc, price_eur, stock, image_path } = data;
    const conn = await pool.getConnection();
    const sql = 'INSERT INTO products (name, description, category, price_kc, price_eur, stock, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await conn.query(sql, [name, description, category, price_kc, price_eur, stock, image_path]);
    conn.release();
}

// Update an existing product
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
        return rows[0] || null; // Return the first row or null if not found
    } finally {
        conn.release();
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, getProductById };
