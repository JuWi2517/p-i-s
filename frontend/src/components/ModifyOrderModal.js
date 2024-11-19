import React, { useState } from 'react';

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
                <h2>Modify Order</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Status:
                        <input type="text" name="status" value={form.status} onChange={handleChange} required />
                    </label>
                    <label>
                        Total Price (Kč):
                        <input type="number" name="total_price_kc" value={form.total_price_kc} onChange={handleChange} required />
                    </label>
                    <label>
                        Total Price (€):
                        <input type="number" name="total_price_eu" value={form.total_price_eu} onChange={handleChange} required />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ModifyOrderModal;