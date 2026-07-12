import { AssetCategory } from '../models/AssetCategory.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createCategory = async (req, res, next) => {
  try {
    const { name, prefix, description } = req.body;

    const existingPrefix = await AssetCategory.findOne({ prefix: prefix.toUpperCase() });
    if (existingPrefix) {
      throw new ApiError(400, 'Category prefix already exists');
    }

    const existingName = await AssetCategory.findOne({ name });
    if (existingName) {
      throw new ApiError(400, 'Category name already exists');
    }

    const category = await AssetCategory.create({
      name,
      prefix: prefix.toUpperCase(),
      description,
    });

    return res.status(201).json(new ApiResponse(201, category, 'Asset Category created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await AssetCategory.find();
    return res.status(200).json(new ApiResponse(200, categories, 'Categories fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await AssetCategory.findById(req.params.id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return res.status(200).json(new ApiResponse(200, category, 'Category fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, prefix, description } = req.body;
    const category = await AssetCategory.findById(req.params.id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    if (prefix && prefix.toUpperCase() !== category.prefix) {
      const prefixExists = await AssetCategory.findOne({ prefix: prefix.toUpperCase() });
      if (prefixExists) throw new ApiError(400, 'Category prefix already exists');
      category.prefix = prefix.toUpperCase();
    }

    if (name && name !== category.name) {
      const nameExists = await AssetCategory.findOne({ name });
      if (nameExists) throw new ApiError(400, 'Category name already exists');
      category.name = name;
    }

    if (description !== undefined) category.description = description;

    await category.save();

    return res.status(200).json(new ApiResponse(200, category, 'Category updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await AssetCategory.findById(req.params.id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    await category.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, 'Category deleted successfully'));
  } catch (error) {
    next(error);
  }
};
