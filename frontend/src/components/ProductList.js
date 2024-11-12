import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

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
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price_kc} Kč / {product.price_eur} €
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
