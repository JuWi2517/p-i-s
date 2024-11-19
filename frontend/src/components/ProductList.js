import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api';
import '../css/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [category, setCategory] = useState('all');

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'inStock' && product.stock > 0) || (filter === 'outOfStock' && product.stock === 0);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesFilter && matchesCategory;
    });

    const categories = ['all', ...new Set(products.map(product => product.category))];

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Products</h1>
            <div className="filters">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select className="filter-select" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
                <select className="filter-select" value={category} onChange={handleCategoryChange}>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                        <img src={`/${product.image_path}`} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">{product.price_kc} Kč</p>
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
