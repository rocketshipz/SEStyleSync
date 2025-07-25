// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getAllProductsAdmin, // New import
  createProduct,      // New import
  updateProduct,      // New import
  softDeleteProduct,  // New import
  hardDeleteProduct,  // New import
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js'; // Ensure protect and admin are imported

// Public routes for customers
router.route('/').get(getProducts); // Get all active products
router.route('/:id').get(getProductById); // Get single active product

// --- ADMIN ROUTES BELOW ---
router.route('/admin')
  .get(protect, admin, getAllProductsAdmin) // Admin: Get all products (including soft-deleted)
  .post(protect, admin, createProduct);    // Admin: Create a new product

router.route('/admin/:id')
  .put(protect, admin, updateProduct)      // Admin: Update a product
  .delete(protect, admin, softDeleteProduct); // Admin: Soft delete a product (sets isSoftDeleted to true)

router.route('/admin/harddelete/:id')
  .delete(protect, admin, hardDeleteProduct); // Admin: Permanently delete a product

export default router;