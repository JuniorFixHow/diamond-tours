import express from 'express';
import { createReview, deleteReview, getReplies, getReviews, updateReview } from '../controllers/ReviewController.js';
const router = express.Router();

router.post('/create', createReview);
router.get('/', getReviews);
router.get('/replies/:id', getReplies);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;