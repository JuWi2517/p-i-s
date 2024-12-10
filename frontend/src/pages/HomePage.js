import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { CurrencyContext } from '../components/CurrencyContext';
import '../css/HomePage.css';

function HomePage() {
    const { currency, setCurrency } = useContext(CurrencyContext);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    return (
        <div className="home-container">
            <div className="currency-switch">
                <label>
                    <input
                        type="radio"
                        value="CZK"
                        checked={currency === 'CZK'}
                        onChange={handleCurrencyChange}
                    />
                    CZK
                </label>
                <label>
                    <input
                        type="radio"
                        value="EUR"
                        checked={currency === 'EUR'}
                        onChange={handleCurrencyChange}
                    />
                    EUR
                </label>
            </div>
            <Link to="/cart">
                <button className="cart-button">Go to Cart</button>
            </Link>
            <ProductList />
        </div>
    );
}

export default HomePage;