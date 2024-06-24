import {Router} from 'express';
import { createNews, deleteNews, getAllNews, getOneNews } from '../controllers/NewsControllers.js';

const router = Router();

router.post('/create', createNews);
router.get('/', getAllNews);
router.delete('/:id', deleteNews);
router.get('/:id', getOneNews);

export default router;