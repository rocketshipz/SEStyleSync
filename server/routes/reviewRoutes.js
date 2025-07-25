// server/routes/reviewRoutes.js
import express from 'express'; // Changed from require
const router = express.Router();
import { // Changed from require and added .js extension for imports
    getProductReviews,
    createProductReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewController.js'; // IMPORTANT: Add .js extension here!
import { protect } from '../middlewares/authMiddleware.js'; // IMPORTANT: Add .js extension here!

router.route('/').post(protect, createProductReview); // Create a new review
router.route('/product/:productId').get(getProductReviews); // Get reviews for a product
router.route('/:id')
    .put(protect, updateReview) // Update a review
    .delete(protect, deleteReview); // Delete a review

export default router; // Changed from module.exports