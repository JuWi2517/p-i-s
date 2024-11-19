import React, { useState, useEffect } from 'react';
import { addProduct, fetchProducts, updateProduct, fetchOrders, updateOrder, fetchUsers } from '../api/api';
import ModifyProductModal from '../components/ModifyProductModal';
import ModifyOrderModal from '../components/ModifyOrderModal';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminPage() {
    const [form, setForm] = useState({
        name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: ''
    });
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]); // State to store orders
    const [users, setUsers] = useState([]); // State to store users
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modification
    const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for modification
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        loadProducts();
        loadOrders(); // Load orders when the component mounts
        loadUsers(); // Load users when the component mounts
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

    const loadUsers = async () => {
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to load users:', error);
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

    const handleSaveProduct = async (product) => {
        try {
            await updateProduct(product.id, product);
            loadProducts(); // Refresh the product list
        } catch (error) {
            alert('Failed to update product!');
        }
    };

    const handleSaveOrder = async (order) => {
        try {
            await updateOrder(order);
            loadOrders(); // Refresh the order list
        } catch (error) {
            alert('Failed to update order!');
        }
    };

    // Prepare data for the profit graph
    const profitData = {
        labels: orders.map(order => new Date(order.order_date).toLocaleDateString()),
        datasets: [
            {
                label: 'Profit (Kč)',
                data: orders.map(order => order.total_price_kc),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
                <input type="number" name="price_kc" value={form.price_kc} onChange={handleChange} placeholder="Price (Kč)" required />
                <input type="number" name="price_eur" value={form.price_eur} onChange={handleChange} placeholder="Price (€)" required />
                <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
                <input type="text" name="image_path" value={form.image_path} onChange={handleChange} placeholder="Image Path" required />
                <button type="submit">Add Product</button>
            </form>

            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price_kc} Kč
                        <button onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}>Modify</button>
                    </li>
                ))}
            </ul>

            <h2>Orders</h2>
            <table>
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
                                <button onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>Modify</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Profits</h2>
            <Line data={profitData} />

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