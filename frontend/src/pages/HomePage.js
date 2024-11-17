import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

function HomePage() {
    return (
        <div>
            <h1>Welcome to the E-Shop</h1>
            <Link to="/cart">
                <button>Go to Cart</button>
            </Link>
            <ProductList />
        </div>
    );
}

export default HomePage;