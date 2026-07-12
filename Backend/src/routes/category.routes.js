import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(authorizeRoles('admin', 'asset_manager'), createCategory)
  .get(getCategories);

router.route('/:id')
  .get(getCategoryById)
  .put(authorizeRoles('admin', 'asset_manager'), updateCategory)
  .delete(authorizeRoles('admin', 'asset_manager'), deleteCategory);

export default router;
