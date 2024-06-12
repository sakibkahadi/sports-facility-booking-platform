import { z } from 'zod';
const createFacilityValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    pricePerHour: z
      .number()
      .positive({ message: 'Price per hour must be a positive number' }),
    location: z.string({ required_error: 'Location is required' }),
    isDeleted: z.boolean().optional(),
  }),
});
export const FacilityValidation = {
  createFacilityValidation,
};
