/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CheckAvailabilityServices } from './Check-availability.service';
import { getTodayDateString } from './Check-avilability.utils';

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};
const CheckAvailability = catchAsync(async (req, res, next) => {
  const dateParam = req.query.date as string;
  const date = dateParam ? dateParam.toString() : getTodayDateString();
  const result = await CheckAvailabilityServices.CheckAvailability(date);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking  successfully',
    data: result,
  });
});
export const CheckAvailabilityControllers = {
  CheckAvailability,
};
