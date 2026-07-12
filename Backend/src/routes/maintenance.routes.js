import { Router } from 'express';
import {
  createMaintenanceRequest,
  updateMaintenanceDetails,
  getMaintenanceRequests,
} from '../controllers/maintenance.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(createMaintenanceRequest)
  .get(getMaintenanceRequests);

router.put('/:id', authorizeRoles('admin', 'asset_manager'), updateMaintenanceDetails);

export default router;
