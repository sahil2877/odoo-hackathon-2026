import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Unauthorized request: Missing token');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new ApiError(401, 'Unauthorized request: Invalid token or user not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || 'Invalid access token'));
  }
};
