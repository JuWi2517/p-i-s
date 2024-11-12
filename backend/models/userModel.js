const pool = require('../db');

// Find a user by email
async function findUserByEmail(email) {
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows = await conn.query(sql, [email]);
        return rows[0]; // Return the first user found, if any
    } finally {
        if (conn) conn.release();
    }
}

// Create a new user
async function createUser({ name, email, password }) {
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await conn.query(sql, [name, email, password]);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { findUserByEmail, createUser };
