import {Router} from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getApprovedBookings,
  getBooking,
  getPendingBookings,
  getUserBookings,
  updateBooking,
} from "../controllers/BookingControllers.js";

const router = Router();

router.post('/create', createBooking);
router.get('/:userId', getUserBookings);
router.get('/', getAllBookings);
router.get('/approved', getApprovedBookings);
router.get('/pending', getPendingBookings);
router.delete('/:id', deleteBooking);
router.put('/:id', updateBooking);
router.get('/one/:id', getBooking);

export default router;