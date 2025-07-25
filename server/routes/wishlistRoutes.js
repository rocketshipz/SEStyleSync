// server/routes/wishlistRoutes.js
import express from 'express'; // Changed from require
const router = express.Router();
import { // Changed from require and added .js extension for imports
    getUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    updateWishlistItemNotes,
} from '../controllers/wishlistController.js'; // IMPORTANT: Add .js extension here!
import { protect } from '../middlewares/authMiddleware.js'; // IMPORTANT: Add .js extension here!

router.route('/').get(protect, getUserWishlist).post(protect, addProductToWishlist);
router.route('/:productId')
    .delete(protect, removeProductFromWishlist);
router.route('/:productId/notes')
    .put(protect, updateWishlistItemNotes);

export default router; // Changed from module.exports