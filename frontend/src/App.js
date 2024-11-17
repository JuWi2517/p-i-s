import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';

// Fake authentication check for demonstration purposes
const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');  // Assumes a token is saved upon login
};

function App() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        // Update auth state when the component mounts or when the token changes
        setIsAuth(isAuthenticated());
    }, []);

    return (
        <UserProvider>
            <CartProvider>
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

                        {/* Product-related routes */}
                        <Route path="/products" element={isAuth ? <ProductList /> : <Navigate to="/login" />} />
                        <Route path="/product/:id" element={isAuth ? <ProductDetail /> : <Navigate to="/login" />} />
                        <Route path="/cart" element={isAuth ? <Cart /> : <Navigate to="/login" />} />
                    </Routes>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;