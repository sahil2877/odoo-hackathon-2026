import { Router } from 'express';
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  updateBookingDetails,
} from '../controllers/booking.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { createBookingSchema, updateBookingSchema } from '../validators/booking.validator.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .post(validateRequest(createBookingSchema), createBooking)
  .get(getBookings);

router.put('/:id/status', updateBookingStatus);
router.put('/:id', validateRequest(updateBookingSchema), updateBookingDetails);

export default router;
