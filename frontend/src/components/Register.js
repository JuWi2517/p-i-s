import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert('Registration successful! Please log in.');
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account?</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
    );
}

export default Register;
