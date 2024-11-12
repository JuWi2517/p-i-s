const productModel = require('../models/productModel'); // Your product model

// Retrieve all products
async function getProducts(req, res) {
    const products = await productModel.getAllProducts();
    res.json(products);
}

// Add a new product
async function addProduct(req, res) {
    const data = req.body;
    await productModel.createProduct(data);
    res.status(201).json({ message: 'Product created successfully' });
}

module.exports = { getProducts, addProduct };
