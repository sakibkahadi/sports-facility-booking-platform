import express from 'express';
import { BookingControllers } from './Booking.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';
import { BookingValidation } from './Booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBookings,
);

export const BookingRoutes = router;
