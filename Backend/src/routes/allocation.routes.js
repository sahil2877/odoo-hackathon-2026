import { Router } from 'express';
import {
  allocateAsset,
  returnAsset,
  getAllocations,
  requestTransfer,
  getTransferRequests,
  approveOrRejectTransfer,
} from '../controllers/allocation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(authorizeRoles('admin', 'asset_manager'), allocateAsset)
  .get(getAllocations);

router.put('/:id/return', authorizeRoles('admin', 'asset_manager'), returnAsset);

// Custody Transfer Request Routes
router.route('/transfers')
  .post(requestTransfer)
  .get(getTransferRequests);

router.put('/transfers/:id', authorizeRoles('admin', 'asset_manager', 'dept_head'), approveOrRejectTransfer);

export default router;
