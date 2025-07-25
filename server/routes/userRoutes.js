// server/routes/userRoutes.js
import express from 'express'; // Changed from require
const router = express.Router();
import { // Changed from require and added .js extension for imports
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    requestOtp,
    verifyOtp,
    resetPassword,
} from '../controllers/userController.js'; // IMPORTANT: Add .js extension here!
import { protect, admin } from '../middlewares/authMiddleware.js'; // IMPORTANT: Add .js extension here!

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes for users
router.route('/').get(protect, admin, getUsers); // Get all users
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

// OTP and Password Reset
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router; // Changed from module.exports