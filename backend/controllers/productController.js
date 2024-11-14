const productModel = require('../models/productModel');

// Retrieve all products
async function getProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}

async function getProductById(req, res) {
    try {
        const id = parseInt(req.params.id, 10); // Explicitly convert to integer
        console.log(`Fetching product with ID: ${id}`);
        const product = await productModel.getProductById(id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve product' });
    }
}


// Add a new product
async function addProduct(req, res) {
    try {
        const data = req.body;
        await productModel.createProduct(data);
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
}

// Update an existing product
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await productModel.updateProduct(id, updatedData);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
}

module.exports = { getProducts, addProduct, updateProduct, getProductById };
