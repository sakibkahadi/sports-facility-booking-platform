import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking, TSchedule } from './Booking.interface';
import { FacilityModel } from '../Facility/Facility.model';
import { BookingModel } from './Booking.model';
import { hasTimeConflict } from './Booking.utils';
import { BOOKING_STATUS } from './Booking.constant';

const CreateBookingIntoDB = async (
  userId: string,
  payload: Partial<TBooking>,
) => {
  const { facility, startTime, endTime, date } = payload;

  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  // Find the facility to get the pricePerHour
  const isFacilityExist = await FacilityModel.findById(facility);
  if (!isFacilityExist || isFacilityExist.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  const durationHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationHours * isFacilityExist.pricePerHour;

  const assignSchedules = await BookingModel.find({
    facility,
    date: { $in: date },
  }).select('date startTime endTime');

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedules, newSchedule as TSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This facility is not available at that time! choose other time or date`,
    );
  }

  const result = await BookingModel.create({
    facility,
    startTime,
    endTime,
    date,
    user: userId,
    payableAmount,
    isBooked: 'confirmed',
  });
  return result;
};
const getAllBookingFromDB = async () => {
  const result = await BookingModel.find()
    .populate('facility')
    .populate('user');
  return result;
};
const getAllBookingByUser = async (logInUser: string) => {
  const result = await BookingModel.find({ user: logInUser })
    .populate('facility')
    .populate('user');

  return result;
};
const cancelABookingFromDB = async (id: string) => {
  const bookingStatus = await BookingModel.findById(id);

  if (!bookingStatus) {
    throw new AppError(httpStatus.NOT_FOUND, 'This bookings is not found ');
  }
  if (bookingStatus?.isBooked === BOOKING_STATUS.canceled) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This booking is already canceled',
    );
  }

  const result = await BookingModel.findByIdAndUpdate(
    id,
    {
      isBooked: BOOKING_STATUS.canceled,
    },
    { new: true },
  )
    .populate('facility')
    .populate('user');
  return result;
};
export const BookingServices = {
  CreateBookingIntoDB,
  getAllBookingFromDB,
  getAllBookingByUser,
  cancelABookingFromDB,
};
