import React, { useState } from 'react';
import '../css/ModifyProductModal.css';

function ModifyProductModal({ product, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        category: product.category,
        price_kc: product.price_kc,
        price_eur: product.price_eur,
        stock: product.stock,
        image_path: product.image_path,
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...product, ...formData });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3 className="modal-title">Modify Product</h3>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="modal-textarea"
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <label>
                        Price (Kč):
                        <input
                            type="number"
                            name="price_kc"
                            value={formData.price_kc}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <label>
                        Price (€):
                        <input
                            type="number"
                            name="price_eur"
                            value={formData.price_eur}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <label>
                        Image Path:
                        <input
                            type="text"
                            name="image_path"
                            value={formData.image_path}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-save-button">Save Changes</button>
                        <button type="button" className="modal-cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyProductModal;
