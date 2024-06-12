import { Schema, model } from 'mongoose';
import { TBooking } from './Booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,

    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
});

export const BookingModel = model<TBooking>('Booking', bookingSchema);
