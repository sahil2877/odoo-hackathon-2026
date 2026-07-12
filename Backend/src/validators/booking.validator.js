import Joi from 'joi';

export const createBookingSchema = Joi.object({
  asset: Joi.string().hex().length(24).required().messages({
    'any.required': 'Asset ID is required',
  }),
  startTime: Joi.date().iso().required().messages({
    'any.required': 'Start time is required',
  }),
  endTime: Joi.date().iso().required().custom((value, helpers) => {
    const { startTime } = helpers.state.ancestors[0];
    if (startTime && value <= startTime) {
      return helpers.message('End time must be after start time');
    }
    return value;
  }).messages({
    'any.required': 'End time is required',
  }),
  purpose: Joi.string().required().trim().messages({
    'any.required': 'Booking purpose is required',
  }),
});

export const updateBookingSchema = Joi.object({
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date().iso().optional().custom((value, helpers) => {
    const { startTime } = helpers.state.ancestors[0];
    if (startTime && value <= startTime) {
      return helpers.message('End time must be after start time');
    }
    return value;
  }),
  purpose: Joi.string().optional().trim(),
  status: Joi.string().valid('Pending', 'Approved', 'Rejected', 'Cancelled').optional(),
});
