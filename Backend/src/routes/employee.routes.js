import { Router } from 'express';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(getEmployees)
  .post(authorizeRoles('admin', 'asset_manager'), createEmployee);

router.route('/:id')
  .put(authorizeRoles('admin', 'asset_manager'), updateEmployee)
  .delete(authorizeRoles('admin'), deleteEmployee);

export default router;
