import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import departmentRoutes from './routes/department.routes.js';
import categoryRoutes from './routes/category.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import assetRoutes from './routes/asset.routes.js';
import allocationRoutes from './routes/allocation.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import auditRoutes from './routes/audit.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import reportRoutes from './routes/report.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/allocations', allocationRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/maintenance', maintenanceRoutes);
app.use('/api/v1/audits', auditRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/reports', reportRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AssetFlow backend is healthy' });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, statusCode: 404, message: 'Resource path not found' });
});

app.use(errorHandler);

export default app;
