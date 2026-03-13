import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';
import {
    getDashboardStats, getUsers, deleteUser,
    getOrders, updateOrderToDelivered,
    createProduct, updateProduct, deleteProduct,
    getAllReviews, deleteReview
} from '../controllers/admin.controller.js';

const router = express.Router();

// All routes require user to be logged in and an admin
router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);
router.route('/orders').get(getOrders);
router.route('/orders/:id/deliver').put(updateOrderToDelivered);
router.route('/products').post(createProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct);
router.route('/reviews').get(getAllReviews);
router.route('/reviews/:id').delete(deleteReview);

export default router;
