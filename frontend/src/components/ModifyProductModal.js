import React, { useState } from 'react';

function ModifyProductModal({ product, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        category: product.category,
        price_kc: product.price_kc,
        price_eur: product.price_eur,
        stock: product.stock,
        image_path: product.image_path
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...product, ...formData }); // Pass updated product data to the save function
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Modify Product</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Price (Kč):
                        <input
                            type="number"
                            name="price_kc"
                            value={formData.price_kc}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Price (€):
                        <input
                            type="number"
                            name="price_eur"
                            value={formData.price_eur}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Image Path:
                        <input
                            type="text"
                            name="image_path"
                            value={formData.image_path}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ModifyProductModal;
