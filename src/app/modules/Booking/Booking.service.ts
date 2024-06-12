import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './Booking.interface';
import { FacilityModel } from '../Facility/Facility.model';
import { BookingModel } from './Booking.model';

const CreateBookingIntoDB = async (
  userId: string,
  payload: Partial<TBooking>,
) => {
  const { facility, startTime, endTime, date } = payload;

  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  // Find the facility to get the pricePerHour
  const isFacilityExist = await FacilityModel.findById(facility);
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  const durationHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationHours * isFacilityExist.pricePerHour;
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
export const BookingServices = {
  CreateBookingIntoDB,
};
