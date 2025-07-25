// server/routes/orderRoutes.js
import express from 'express'; // Changed from require
const router = express.Router();
import { // Changed from require and added .js extension for imports
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderStatus,
    getMyOrders,
    getOrders,
} from '../controllers/orderController.js'; // IMPORTANT: Add .js extension here!
import { protect, admin } from '../middlewares/authMiddleware.js'; // IMPORTANT: Add .js extension here!

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/status').put(protect, admin, updateOrderStatus); // Admin route to update status

export default router; // Changed from module.exports