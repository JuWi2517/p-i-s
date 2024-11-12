const express = require('express');
const productController = require('../controllers/productController'); // Import product controller
const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);

module.exports = router;
