import React, { useState, useEffect } from 'react';
import { addProduct, fetchProducts, updateProduct } from '../api/api';
import ModifyProductModal from '../components/ModifyProductModal';

function AdminPage() {
    const [form, setForm] = useState({
        name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: ''
    });
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modification
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    // Handle change for add product form
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Handle submit for add product form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(form);
            alert('Product added successfully!');
            setForm({ name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: '' });
            loadProducts(); // Refresh the product list
        } catch (error) {
            alert('Failed to add product!');
        }
    };

    // Handle modify button click for each product
    const handleModifyClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Convert `id` to an integer if needed
    const handleUpdateProduct = async (updatedProduct) => {
        try {
            // Ensure the id is an integer before sending it to the backend
            updatedProduct.id = parseInt(updatedProduct.id, 10);
            await updateProduct(updatedProduct);
            setShowModal(false);
            loadProducts();
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };
    

    

    return (
        <div>
            <h1>Admin - Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                <input name="price_kc" type="number" placeholder="Price (Kč)" value={form.price_kc} onChange={handleChange} />
                <input name="price_eur" type="number" placeholder="Price (€)" value={form.price_eur} onChange={handleChange} />
                <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
                <input name="image_path" type="text" placeholder="Image Path" value={form.image_path} onChange={handleChange} />
                <button type="submit">Add Product</button>
            </form>

            <h2>Products List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - Kč {product.price_kc} / € {product.price_eur}
                        <button onClick={() => handleModifyClick(product)}>Modify</button>
                    </li>
                ))}
            </ul>

            {showModal && selectedProduct && (
                <ModifyProductModal
                    product={selectedProduct}
                    onClose={() => setShowModal(false)}
                    onSave={handleUpdateProduct}
                />
            )}
        </div>
    );
}

export default AdminPage;
