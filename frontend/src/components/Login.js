import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

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
                navigate('/home'); // Redirect to home page after successful login
            } else {
                alert("Login failed: No token received.");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => navigate('/register')}>Go to Register</button>
        </div>
    );
}

export default Login;
