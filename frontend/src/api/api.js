import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchProductById = (id) => axios.get(`${API_URL}/products/${id}`);
export const addProduct = (productData) => axios.post(`${API_URL}/products`, productData);
export const updateProduct = (id, productData) => axios.put(`${API_URL}/products/${id}`, productData);
export const placeOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData);
export const fetchOrders = () => axios.get(`${API_URL}/orders`);
export const updateOrder = (orderData) => axios.put(`${API_URL}/orders/${orderData.id}`, orderData);