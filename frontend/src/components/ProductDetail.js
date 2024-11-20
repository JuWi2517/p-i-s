import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';
import { CartContext } from './CartContext';
import '../css/ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const response = await fetchProductById(id);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        alert('Item added to cart!');
    };

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!product) return <p className="error-message">Product not found</p>;

    return (
        <div className="product-detail-container">
            <h2 className="product-title">{product.name}</h2>
            <img
                src={`/${product.image_path}`}
                alt={product.name}
                className="product-image"
            />
            <p className="product-description">{product.description}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">
                Price: {product.price_kc} Kč / {product.price_eur} €
            </p>
            <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
            </p>
            <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
}

export default ProductDetail;
