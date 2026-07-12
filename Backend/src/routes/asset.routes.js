import { Router } from 'express';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from '../controllers/asset.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { createAssetSchema, updateAssetSchema } from '../validators/asset.validator.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(authorizeRoles('admin', 'asset_manager'), validateRequest(createAssetSchema), createAsset)
  .get(getAssets);

router.route('/:id')
  .get(getAssetById)
  .put(authorizeRoles('admin', 'asset_manager'), validateRequest(updateAssetSchema), updateAsset)
  .delete(authorizeRoles('admin'), deleteAsset);

export default router;
