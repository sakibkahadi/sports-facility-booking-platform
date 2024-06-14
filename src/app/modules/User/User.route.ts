import express from 'express';
import { UserControllers } from './User.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './User.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.signupUserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidation),
  UserControllers.loginUser,
);

export const UserRoutes = router;
