import express from 'express';
import { createProductReview, getProductReviews } from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/:productId').get(getProductReviews).post(protect, createProductReview);

export default router;
