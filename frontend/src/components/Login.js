import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(form);
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                alert('Login successful!');
                navigate('/home');
            } else {
                alert('Login failed: No token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed!');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    className="login-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button className="login-button" type="submit">Login</button>
            </form>
            <p className="register-prompt">Don't have an account?</p>
            <button className="register-button" onClick={() => navigate('/register')}>
                Go to Register
            </button>
        </div>
    );
}

export default Login;
