import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Register from './components/Register';
import Login from './components/Login';

// Fake authentication check for demonstration purposes
const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');  // This assumes a token is saved upon login
};

function App() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        // Update auth state when the component mounts or when the token changes
        setIsAuth(isAuthenticated());
    }, []);

    return (
        <Router>
            <Routes>
                {/* Redirect root to registration page */}
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                
                {/* Login page */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuth ? <AdminPage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
