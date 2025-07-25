import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Alert
} from '@mui/material';
import { Edit, Delete, Add, RestoreFromTrash } from '@mui/icons-material';
import axios from 'axios'; // Assuming your backend is accessible via Axios

// Dummy API functions for product management
// In a real app, these would interact with your actual backend endpoints
const productApi = {
  getProducts: async () => {
    // Simulate API call
    return new Promise(resolve => setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products')) || [
        { id: 'prod1', name: 'T-Shirt', stock: 100, isDeleted: false },
        { id: 'prod2', name: 'Jeans', stock: 50, isDeleted: false },
        { id: 'prod3', name: 'Sneakers', stock: 75, isDeleted: true }, // Example of a soft-deleted product
      ];
      resolve({ data: products });
    }, 500));
  },
  addProduct: async (product) => {
    return new Promise(resolve => setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const newProduct = { ...product, id: `prod${Date.now()}`, isDeleted: false };
      localStorage.setItem('products', JSON.stringify([...products, newProduct]));
      resolve({ data: newProduct });
    }, 500));
  },
  updateProduct: async (id, updatedFields) => {
    return new Promise(resolve => setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      localStorage.setItem('products', JSON.stringify(products));
      resolve({ data: products.find(p => p.id === id) });
    }, 500));
  },
  softDeleteProduct: async (id) => {
    return new Promise(resolve => setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.map(p => p.id === id ? { ...p, isDeleted: true } : p);
      localStorage.setItem('products', JSON.stringify(products));
      resolve({ message: 'Product soft-deleted successfully' });
    }, 500));
  },
  restoreProduct: async (id) => {
    return new Promise(resolve => setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.map(p => p.id === id ? { ...p, isDeleted: false } : p);
      localStorage.setItem('products', JSON.stringify(products));
      resolve({ message: 'Product restored successfully' });
    }, 500));
  },
  // Hard delete (only for truly removing from DB)
  deleteProduct: async (id) => {
    return new Promise(resolve => setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(products));
      resolve({ message: 'Product deleted permanently' });
    }, 500));
  },
};


function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // For editing
  const [productName, setProductName] = useState('');
  const [productStock, setProductStock] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await productApi.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddDialog = () => {
    setCurrentProduct(null); // Clear for new product
    setProductName('');
    setProductStock('');
    setOpenDialog(true);
    setError('');
    setSuccess('');
  };

  const handleOpenEditDialog = (product) => {
    setCurrentProduct(product);
    setProductName(product.name);
    setProductStock(product.stock);
    setOpenDialog(true);
    setError('');
    setSuccess('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveProduct = async () => {
    setError('');
    setSuccess('');

    if (!productName || productStock === '') {
      setError('Product name and stock are required.');
      return;
    }
    if (isNaN(productStock) || parseInt(productStock) < 0) {
      setError('Stock must be a non-negative number.');
      return;
    }

    try {
      if (currentProduct) {
        // Update product
        await productApi.updateProduct(currentProduct.id, { name: productName, stock: parseInt(productStock) });
        setSuccess('Product updated successfully!');
      } else {
        // Add new product
        await productApi.addProduct({ name: productName, stock: parseInt(productStock) });
        setSuccess('Product added successfully!');
      }
      fetchProducts(); // Re-fetch products to update the list
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    }
  };

  const handleSoftDelete = async (id) => {
    if (window.confirm('Are you sure you want to soft-delete this product?')) {
      try {
        await productApi.softDeleteProduct(id);
        setSuccess('Product soft-deleted successfully!');
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to soft-delete product.');
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm('Are you sure you want to restore this product?')) {
      try {
        await productApi.restoreProduct(id);
        setSuccess('Product restored successfully!');
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to restore product.');
      }
    }
  };

  const handleHardDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this product? This action cannot be undone.')) {
      try {
        await productApi.deleteProduct(id);
        setSuccess('Product permanently deleted!');
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product permanently.');
      }
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Product Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>{success}</Alert>}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenAddDialog}
        sx={{ mb: 3, borderRadius: '8px', backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
      >
        Add New Product
      </Button>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: product.isDeleted ? '#ffeeee' : 'inherit' }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">
                  {product.isDeleted ? (
                    <Typography variant="body2" color="error">Soft-Deleted</Typography>
                  ) : (
                    <Typography variant="body2" color="success">Active</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {!product.isDeleted ? (
                    <>
                      <IconButton aria-label="edit" onClick={() => handleOpenEditDialog(product)} color="info">
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="soft delete" onClick={() => handleSoftDelete(product.id)} color="warning">
                        <Delete />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton aria-label="restore" onClick={() => handleRestore(product.id)} color="success">
                        <RestoreFromTrash />
                      </IconButton>
                      <IconButton aria-label="hard delete" onClick={() => handleHardDelete(product.id)} color="error">
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {currentProduct ? 'Modify the product details below.' : 'Enter details for the new product.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="productName"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="productStock"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            {currentProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductManagement;
