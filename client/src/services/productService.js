// client/src/services/productService.js
import axios from 'axios';

// Define your backend API base URL
// Make sure this matches your backend server's address (e.g., http://localhost:5000)
const API_URL = 'http://localhost:5000/api/products/';

// Function to get all products
const getProducts = async () => {
    try {
        const response = await axios.get(API_URL); // Makes a GET request to /api/products
        return response.data; // The data from your backend
    } catch (error) {
        // Handle errors (e.g., log them, throw for calling component to catch)
        console.error('Error fetching products:', error);
        throw error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    }
};

// Function to get a single product by ID
const getProductById = async (id) => {
    try {
        const response = await axios.get(API_URL + id); // Makes a GET request to /api/products/:id
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    }
};

// You would add more functions here for admin actions if needed,
// like createProduct, updateProduct, deleteProduct, etc.,
// which would also require sending authentication tokens.

export {
    getProducts,
    getProductById,
    // ... other product-related functions
};