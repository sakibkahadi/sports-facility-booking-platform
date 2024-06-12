/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './Booking.service';

const createBookings = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const result = await BookingServices.CreateBookingIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking  successfully',
    data: result,
  });
});
export const BookingControllers = {
  createBookings,
};
