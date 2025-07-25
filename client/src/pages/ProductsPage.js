// client/src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService'; // Import the service function

function ProductsPage() {
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true);   // State for loading indicator
    const [error, setError] = useState(null);       // State for error messages

    useEffect(() => {
        // Function to fetch products
        const fetchProducts = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const data = await getProducts(); // Call the service to get products
                setProducts(data); // Update state with fetched products
                setLoading(false); // Set loading to false after successful fetch
            } catch (err) {
                setError('Failed to load products. Please try again later.'); // Set error message
                setLoading(false); // Set loading to false on error
                console.error(err); // Log the error for debugging
            }
        };

        fetchProducts(); // Call the fetch function when the component mounts
    }, []); // The empty dependency array means this useEffect runs only once, like componentDidMount

    // Render based on loading, error, or data
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Loading products...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>
        );
    }

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                Our Latest Products
            </Typography>
            {products.length === 0 ? (
                <Typography variant="h6" align="center" color="text.secondary">
                    No products available yet.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default ProductsPage;