import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';
import { ActivityLog } from '../models/ActivityLog.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      department,
    });

    user.password = undefined;

    await ActivityLog.create({
      user: user._id,
      action: 'USER_REGISTER',
      details: `User registered with email: ${email}`,
      ipAddress: req.ip,
    });

    const token = generateToken(user._id);

    return res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.status === 'inactive') {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    user.password = undefined;

    await ActivityLog.create({
      user: user._id,
      action: 'USER_LOGIN',
      details: `User logged in`,
      ipAddress: req.ip,
    });

    const token = generateToken(user._id);

    return res.status(200).json(new ApiResponse(200, { user, token }, 'User logged in successfully'));
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('department', 'name code').select('-password');
    return res.status(200).json(new ApiResponse(200, user, 'Profile fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, department } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) throw new ApiError(400, 'Email already in use');
      user.email = email;
    }
    if (password) user.password = password;
    if (department !== undefined) user.department = department;

    await user.save();
    user.password = undefined;

    await ActivityLog.create({
      user: user._id,
      action: 'USER_PROFILE_UPDATE',
      details: 'User updated their profile details',
      ipAddress: req.ip,
    });

    return res.status(200).json(new ApiResponse(200, user, 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
};
