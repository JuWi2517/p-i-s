import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        loadProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                        <img src={`/${product.image_path}`} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p>{product.price_kc}Kč</p>
                        <p className={product.stock > 0 ? 'stock-available' : 'stock-unavailable'}>
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductList;