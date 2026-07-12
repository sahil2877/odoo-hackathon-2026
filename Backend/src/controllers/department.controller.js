import { Department } from '../models/Department.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createDepartment = async (req, res, next) => {
  try {
    const { name, code, head, description } = req.body;

    const existingCode = await Department.findOne({ code: code.toUpperCase() });
    if (existingCode) {
      throw new ApiError(400, 'Department code already exists');
    }

    const existingName = await Department.findOne({ name });
    if (existingName) {
      throw new ApiError(400, 'Department name already exists');
    }

    const department = await Department.create({
      name,
      code: code.toUpperCase(),
      head,
      description,
    });

    return res.status(201).json(new ApiResponse(201, department, 'Department created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate('head', 'name email role');
    return res.status(200).json(new ApiResponse(200, departments, 'Departments fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id).populate('head', 'name email role');
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }
    return res.status(200).json(new ApiResponse(200, department, 'Department fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const { name, code, head, description } = req.body;
    const department = await Department.findById(req.params.id);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

    if (code && code.toUpperCase() !== department.code) {
      const codeExists = await Department.findOne({ code: code.toUpperCase() });
      if (codeExists) throw new ApiError(400, 'Department code already exists');
      department.code = code.toUpperCase();
    }

    if (name && name !== department.name) {
      const nameExists = await Department.findOne({ name });
      if (nameExists) throw new ApiError(400, 'Department name already exists');
      department.name = name;
    }

    if (head !== undefined) department.head = head;
    if (description !== undefined) department.description = description;

    await department.save();

    return res.status(200).json(new ApiResponse(200, department, 'Department updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

    await department.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, 'Department deleted successfully'));
  } catch (error) {
    next(error);
  }
};
