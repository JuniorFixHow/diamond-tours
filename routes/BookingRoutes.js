import {Router} from 'express';
import { createBooking, deleteBooking, getAllBookings, getBooking, getUserBookings } from '../controllers/BookingControllers.js';

const router = Router();

router.post('/create', createBooking);
router.get('/:userId', getUserBookings);
router.get('/', getAllBookings);
router.delete('/:id', deleteBooking);
router.get('/one/:id', getBooking);

export default router;