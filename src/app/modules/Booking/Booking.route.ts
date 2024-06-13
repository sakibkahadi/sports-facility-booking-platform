import express from 'express';
import { BookingControllers } from './Booking.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';
import { BookingValidation } from './Booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBookings,
);
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get(
  '/:user',
  auth(USER_ROLE.user),
  BookingControllers.getAllBookingsByUser,
);
router.delete('/:id', auth(USER_ROLE.user), BookingControllers.cancelABooking);

export const BookingRoutes = router;
