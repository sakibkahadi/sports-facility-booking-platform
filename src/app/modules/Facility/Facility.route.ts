import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './Facility.validation';
import { FacilityControllers } from './Facility.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilityValidation),
  FacilityControllers.createFacility,
);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.updateFacilityValidation),
  FacilityControllers.updateFacility,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  FacilityControllers.getAllFacility,
);

export const FacilityRoutes = router;
