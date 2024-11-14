import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';

function ProductDetail({ addToCart }) {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const response = await fetchProductById(id); // Fetch the product details
                setProduct(response.data);
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.image_path} alt={product.name} style={{ width: '300px', height: 'auto' }} />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price_kc} Kč / {product.price_eur} €</p>
            <p>In Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;
