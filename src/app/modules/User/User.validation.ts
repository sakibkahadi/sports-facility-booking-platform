import { z } from 'zod';

const signupUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    phone: z.string().regex(/^(\+88)?01[3-9]\d{8}$/, {
      message:
        'Invalid phone number format. Must be a valid Bangladeshi number',
    }),
    role: z.enum(['admin', 'user'], {
      message: 'Role must be either admin or user',
    }),
    address: z.string({ message: 'Address is required' }),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidations = {
  signupUserValidationSchema,
  loginUserValidation,
};
