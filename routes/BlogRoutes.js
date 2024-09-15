import express from 'express';
import { addBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/BlogController.js';

const router = express.Router();

router.post('/create', addBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);

export default router;