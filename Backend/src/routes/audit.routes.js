import { Router } from 'express';
import {
  createAuditCycle,
  startAuditCycle,
  getAuditCycles,
  getAuditCycleDetails,
  updateAuditItem,
  completeAuditCycle,
} from '../controllers/audit.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles('admin', 'asset_manager'));

router.route('/')
  .post(createAuditCycle)
  .get(getAuditCycles);

router.route('/:id')
  .get(getAuditCycleDetails);

router.put('/:id/start', startAuditCycle);
router.put('/:id/complete', completeAuditCycle);
router.put('/items/:itemId', updateAuditItem);

export default router;
