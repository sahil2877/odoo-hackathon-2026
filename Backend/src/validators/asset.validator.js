import Joi from 'joi';

export const createAssetSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'Asset name is required',
  }),
  category: Joi.string().hex().length(24).required().messages({
    'any.required': 'Asset category ID is required',
  }),
  status: Joi.string().valid('Available', 'Allocated', 'Maintenance', 'Disposed').default('Available'),
  serialNumber: Joi.string().allow('').default(''),
  model: Joi.string().allow('').default(''),
  manufacturer: Joi.string().allow('').default(''),
  purchaseDate: Joi.date().iso().allow(null).optional(),
  warrantyExpiry: Joi.date().iso().allow(null).optional(),
  value: Joi.number().min(0).default(0),
  location: Joi.string().allow('').default(''),
  description: Joi.string().allow('').default(''),
});

export const updateAssetSchema = Joi.object({
  name: Joi.string().optional().trim(),
  category: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('Available', 'Allocated', 'Maintenance', 'Disposed').optional(),
  serialNumber: Joi.string().allow('').optional(),
  model: Joi.string().allow('').optional(),
  manufacturer: Joi.string().allow('').optional(),
  purchaseDate: Joi.date().iso().allow(null).optional(),
  warrantyExpiry: Joi.date().iso().allow(null).optional(),
  value: Joi.number().min(0).optional(),
  location: Joi.string().allow('').optional(),
  description: Joi.string().allow('').optional(),
});
