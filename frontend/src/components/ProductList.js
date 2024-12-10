import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api';
import { CurrencyContext } from './CurrencyContext';
import '../css/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { currency } = useContext(CurrencyContext);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        };
        loadProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul className="product-list">
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-item">
                        <Link to={`/product/${product.id}`} className="product-link">
                            <img src={`/${product.image_path}`} alt={product.name} className="product-image" />
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">
                                    {currency === 'CZK' ? `${product.price_kc} Kč` : `${(product.price_kc * 0.04).toFixed(2)} €`}
                                </p>
                                <p className={product.stock > 0 ? 'stock-available' : 'stock-unavailable'}>
                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;