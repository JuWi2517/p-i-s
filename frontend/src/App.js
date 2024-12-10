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
import { CurrencyProvider } from './components/CurrencyContext';

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

function App() {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);

    return (
        <UserProvider>
            <CartProvider>
                <CurrencyProvider>
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
                </CurrencyProvider>
            </CartProvider>
        </UserProvider>
    );
}

export default App;