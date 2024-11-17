const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getProducts); // Retrieve all products
router.post('/', productController.addProduct); // Add a new product
router.put('/:id', productController.updateProduct); // Update an existing product by ID
router.get('/:id', productController.getProductById); // Retrieve a product by ID

module.exports = router;
