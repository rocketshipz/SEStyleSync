// server/controllers/productController.js
import asyncHandler from 'express-async-handler'; // If you use this
import Product from '../models/Product.js'; // Make sure Product model is using ES Modules

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// You would add other product-related controller functions here, e.g., createProduct, updateProduct, deleteProduct

// Export all functions as named exports
export {
  getProducts,
  getProductById,
  // ... other exported functions
};