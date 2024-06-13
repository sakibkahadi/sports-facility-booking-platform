import { BookingModel } from '../Booking/Booking.model';
import { totalSlots } from './Check-availability.constant';
import { TBookedSlots } from './Check-availability.interface';

const CheckAvailability = async (date: string) => {
  const bookings = await BookingModel.find({ date });
  const bookedSlots: TBookedSlots[] = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));
  const availableSlots = totalSlots.filter((slot) => {
    for (const booked of bookedSlots) {
      if (slot.startTime < booked.endTime && slot.endTime > booked.startTime) {
        return false;
      }
    }
    return true;
  });
  return availableSlots;
};
export const CheckAvailabilityServices = {
  CheckAvailability,
};
