import React, { useState } from 'react';
import '../css/ModifyOrderModal.css';

function ModifyOrderModal({ order, onClose, onSave }) {
    const [form, setForm] = useState({ ...order });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(form);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-title">Modify Order</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="modal-input"
                            required
                        />
                    </label>
                    <label>
                        Total Price (Kč):
                        <input
                            type="number"
                            name="total_price_kc"
                            value={form.total_price_kc}
                            onChange={handleChange}
                            className="modal-input"
                            required
                        />
                    </label>
                    <label>
                        Total Price (€):
                        <input
                            type="number"
                            name="total_price_eu"
                            value={form.total_price_eu}
                            onChange={handleChange}
                            className="modal-input"
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-save-button">Save</button>
                        <button type="button" className="modal-cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyOrderModal;
