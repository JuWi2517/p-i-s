import React, { useState, useEffect } from 'react';
import { addProduct, fetchProducts, updateProduct, fetchOrders, updateOrder } from '../api/api';
import ModifyProductModal from '../components/ModifyProductModal';
import ModifyOrderModal from '../components/ModifyOrderModal';
import '../css/AdminPage.css';

function AdminPage() {
    const [form, setForm] = useState({
        name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: ''
    });
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        loadProducts();
        loadOrders();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const loadOrders = async () => {
        try {
            const response = await fetchOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(form);
            alert('Product added successfully!');
            setForm({ name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: '' });
            loadProducts();
        } catch (error) {
            alert('Failed to add product!');
        }
    };

    const handleSaveProduct = async (product) => {
        try {
            await updateProduct(product.id, product);
            loadProducts();
        } catch (error) {
            alert('Failed to update product!');
        }
    };

    const handleSaveOrder = async (order) => {
        try {
            await updateOrder(order);
            loadOrders();
        } catch (error) {
            alert('Failed to update order!');
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Page</h1>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
                <input type="number" name="price_kc" value={form.price_kc} onChange={handleChange} placeholder="Price (Kč)" required />
                <input type="number" name="price_eur" value={form.price_eur} onChange={handleChange} placeholder="Price (€)" required />
                <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
                <input type="text" name="image_path" value={form.image_path} onChange={handleChange} placeholder="Image Path" required />
                <button type="submit" className="add-product-button">Add Product</button>
            </form>

            <h2>Products</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        {product.name} - {product.price_kc} Kč
                        <button
                            className="modify-button"
                            onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}
                        >
                            Modify
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Orders</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Total Price (Kč)</th>
                        <th>Total Price (€)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{new Date(order.order_date).toLocaleString()}</td>
                            <td>{order.status}</td>
                            <td>{order.total_price_kc}</td>
                            <td>{order.total_price_eu}</td>
                            <td>
                                <button
                                    className="modify-button"
                                    onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}
                                >
                                    Modify
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showProductModal && selectedProduct && (
                <ModifyProductModal
                    product={selectedProduct}
                    onClose={() => setShowProductModal(false)}
                    onSave={handleSaveProduct}
                />
            )}

            {showOrderModal && selectedOrder && (
                <ModifyOrderModal
                    order={selectedOrder}
                    onClose={() => setShowOrderModal(false)}
                    onSave={handleSaveOrder}
                />
            )}
        </div>
    );
}

export default AdminPage;
