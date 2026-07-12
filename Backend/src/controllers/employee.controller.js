import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await User.find().populate('department', 'name code').select('-password');
    return res.status(200).json(new ApiResponse(200, employees, 'Employees fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, role, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    const employee = await User.create({
      name,
      email,
      password,
      role: role || 'employee',
      department,
    });

    employee.password = undefined;

    return res.status(201).json(new ApiResponse(201, employee, 'Employee created successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { name, role, department, status } = req.body;
    const employee = await User.findById(req.params.id);
    if (!employee) {
      throw new ApiError(404, 'Employee not found');
    }

    if (name) employee.name = name;
    if (role) employee.role = role;
    if (department !== undefined) employee.department = department;
    if (status) employee.status = status;

    await employee.save();
    employee.password = undefined;

    return res.status(200).json(new ApiResponse(200, employee, 'Employee updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      throw new ApiError(404, 'Employee not found');
    }

    employee.status = 'inactive';
    await employee.save();

    return res.status(200).json(new ApiResponse(200, null, 'Employee deactivated successfully'));
  } catch (error) {
    next(error);
  }
};
