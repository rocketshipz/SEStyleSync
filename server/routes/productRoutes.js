// server/routes/productRoutes.js
import express from 'express'; // Change from require
const router = express.Router();

// Import your product controller functions (make sure productController.js is also converted to ES Modules)
import {
  getProducts,
  getProductById,
  // ... other product controller functions you might have
} from '../controllers/productController.js'; // IMPORTANT: add .js extension and named imports

// Define your product routes
router.route('/').get(getProducts); // Example: GET all products
router.route('/:id').get(getProductById); // Example: GET a single product by ID

// You can add more routes here, e.g.,
// router.route('/').post(protect, admin, createProduct);
// router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router; // Change from module.exports