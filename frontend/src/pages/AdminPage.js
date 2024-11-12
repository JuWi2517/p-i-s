import React, { useState } from 'react';
import { addProduct } from '../api/api';

function AdminPage() {
    const [form, setForm] = useState({
        name: '', description: '', category: '', price_kc: '', price_eur: '', stock: '', image_path: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(form);
            alert('Product added successfully!');
        } catch (error) {
            alert('Failed to add product!');
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
                <input name="image_path" placeholder="Image Path" value={form.image_path} onChange={handleChange} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AdminPage;
