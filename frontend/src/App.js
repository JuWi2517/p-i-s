import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { CartProvider } from './components/CartContext';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { isAuthenticated } from './utils/auth';

function App() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);

    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/register" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
                        <Route path="/admin" element={isAuth ? <AdminPage /> : <Navigate to="/login" />} />
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