import { Router } from 'express';
import {
  getInventoryReport,
  getAllocationHistoryReport,
  getMaintenanceReport,
} from '../controllers/report.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles('admin', 'asset_manager'));

router.get('/inventory', getInventoryReport);
router.get('/allocations', getAllocationHistoryReport);
router.get('/maintenance', getMaintenanceReport);

export default router;
