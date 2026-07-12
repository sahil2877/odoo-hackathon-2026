import { Router } from 'express';
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(authorizeRoles('admin', 'asset_manager'), createDepartment)
  .get(getDepartments);

router.route('/:id')
  .get(getDepartmentById)
  .put(authorizeRoles('admin'), updateDepartment)
  .delete(authorizeRoles('admin'), deleteDepartment);

export default router;
