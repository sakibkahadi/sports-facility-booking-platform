import { z } from 'zod';

const dateStringRegex = z.string().refine(
  (time) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return dateRegex.test(time);
  },
  { message: 'Invalid date format. Use yyyy-mm-dd.' },
);

const timeStringRegex = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: 'Invalid time format, expected "HH:MM" in 24 hour format' },
); //hh: mm

const bookingValidationSchema = z.object({
  body: z
    .object({
      date: dateStringRegex,
      startTime: timeStringRegex,
      endTime: timeStringRegex,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time',
      },
    ),
});
export const BookingValidation = {
  bookingValidationSchema,
};
