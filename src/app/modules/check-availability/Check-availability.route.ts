import express from 'express';
import { CheckAvailabilityControllers } from './Check-availability.controller';

const router = express.Router();

router.get('/', CheckAvailabilityControllers.CheckAvailability);
export const CheckAvailabilityRoutes = router;
