import { Router } from 'express';
import { UserRoutes } from '../modules/User/User.route';
import { FacilityRoutes } from '../modules/Facility/Facility.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
