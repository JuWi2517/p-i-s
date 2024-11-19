const express = require('express');
const authController = require('../controllers/authController'); // Import the auth controller
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/users', authController.getAllUsers);
module.exports = router;
