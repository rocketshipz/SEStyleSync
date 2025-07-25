// server/controllers/productController.js
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js'; // Ensure Product model is using ES Modules

// @desc    Fetch all active products (for customers)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // Only fetch products that are not soft-deleted for public view
    const products = await Product.find({ isSoftDeleted: false });
    res.json(products);
});

// @desc    Fetch single active product by ID (for customers)
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id, isSoftDeleted: false });
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found or soft-deleted');
    }
});

// --- ADMIN FUNCTIONS BELOW ---

// @desc    Admin: Fetch all products (including soft-deleted, for admin view)
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProductsAdmin = asyncHandler(async (req, res) => {
    const products = await Product.find({}); // Fetch all, including soft-deleted ones
    res.json(products);
});

// @desc    Admin: Create a new product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // Assume you're sending name, videoURL, description, price, etc. from frontend
    // IMPORTANT: Add validation for these fields
    const { name, videoURL, description, brand, category, price, countInStock } = req.body;

    const product = new Product({
        name,
        videoURL, // Use videoURL as per your data
        description,
        brand: brand || 'Unbranded', // Default if not provided
        category: category || 'General',
        price: price || 0,
        countInStock: countInStock || 0,
        rating: 0,
        numReviews: 0,
        isSoftDeleted: false,
        user: req.user._id, // Assign product to the admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Admin: Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, videoURL, description, brand, category, price, countInStock, isSoftDeleted } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name !== undefined ? name : product.name;
        product.videoURL = videoURL !== undefined ? videoURL : product.videoURL;
        product.description = description !== undefined ? description : product.description;
        product.brand = brand !== undefined ? brand : product.brand;
        product.category = category !== undefined ? category : product.category;
        product.price = price !== undefined ? price : product.price;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.isSoftDeleted = isSoftDeleted !== undefined ? isSoftDeleted : product.isSoftDeleted;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Admin: Soft delete a product
// @route   DELETE /api/admin/products/:id (this will be a PUT to update isSoftDeleted)
// @access  Private/Admin
const softDeleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.isSoftDeleted = true; // Set to true to "soft delete"
        await product.save();
        res.json({ message: 'Product soft-deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Admin: Permanently delete a product (use with extreme caution)
// @route   DELETE /api/admin/products/harddelete/:id
// @access  Private/Admin
const hardDeleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id }); // Permanently remove from DB
        res.json({ message: 'Product permanently deleted' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById,
    getAllProductsAdmin, // New export
    createProduct,      // New export
    updateProduct,      // New export
    softDeleteProduct,  // New export
    hardDeleteProduct,  // New export
};