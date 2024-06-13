/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './Booking.service';
import AppError from '../../errors/AppError';

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
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'No Data found',
      data: [result],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
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
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});
export const BookingControllers = {
  createBookings,
  getAllBookings,
  getAllBookingsByUser,
};
