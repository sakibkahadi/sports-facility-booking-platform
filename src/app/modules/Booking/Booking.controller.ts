/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './Booking.service';
import AppError from '../../errors/AppError';
import { CheckAvailabilityServices } from '../check-availability/Check-availability.service';

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
const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingFromDB();

  sendResponse(res, {
    // statusCode: httpStatus.OK,
    statusCode: result.length > 0 || result === null ? 200 : 404,
    success: true,
    message:
      result.length > 0 || result === null
        ? 'Booking retrieve successfully '
        : 'No Data found',
    data: result,
  });
});
const getAllBookingsByUser = catchAsync(async (req, res, next) => {
  const logInUser = req.user.userId;
  const filterUser = req.params.user;

  if (filterUser !== logInUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  // console.log(filterUser, logInUser);
  const result = await BookingServices.getAllBookingByUser(logInUser);

  sendResponse(res, {
    // statusCode: httpStatus.OK,
    statusCode: result.length > 0 || result === null ? 200 : 404,
    success: true,
    message:
      result.length > 0 || result === null
        ? 'Booking retrieve successfully '
        : 'No Data found',
    data: result,
  });
});
const cancelABooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BookingServices.cancelABookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});
export const BookingControllers = {
  createBookings,
  getAllBookings,
  getAllBookingsByUser,
  cancelABooking,
};
