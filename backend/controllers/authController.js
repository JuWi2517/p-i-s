const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Use a secure, complex JWT secret key
const JWT_SECRET = 'f8#~3N0^&eLZ9p$!K1s*3a@oP2w_5Tb%Vn8tG6!7sQwX#Cv!Pz'; // Replace with a secure key or use env variables

// Register a new user
async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user in the database
        await userModel.createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Registration successful! You can now log in.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
}

// Log in an existing user
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Send token in response
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}


module.exports = { registerUser, loginUser};
