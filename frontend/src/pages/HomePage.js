import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../css/HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <Link to="/cart">
                <button className="cart-button">Go to Cart</button>
            </Link>
            <ProductList />
        </div>
    );
}

export default HomePage;
