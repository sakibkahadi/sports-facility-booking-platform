import { Router } from 'express';
import { UserRoutes } from '../modules/User/User.route';
import { FacilityRoutes } from '../modules/Facility/Facility.route';
import { BookingRoutes } from '../modules/Booking/Booking.route';
import { CheckAvailabilityRoutes } from '../modules/check-availability/Check-availability.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },

  {
    path: '/bookings',
    route: BookingRoutes,
  },

  {
    path: '/check-availability',
    route: CheckAvailabilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
