import { Asset } from '../models/Asset.js';
import { AssetCategory } from '../models/AssetCategory.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateAssetTag } from '../utils/assetTagGenerator.js';

export const createAsset = async (req, res, next) => {
  try {
    const { name, category, status, serialNumber, model, manufacturer, purchaseDate, warrantyExpiry, value, location, description } = req.body;

    const categoryRecord = await AssetCategory.findById(category);
    if (!categoryRecord) {
      throw new ApiError(404, 'Asset Category not found');
    }

    const assetTag = await generateAssetTag(categoryRecord.prefix);

    const asset = await Asset.create({
      name,
      assetTag,
      category,
      status,
      serialNumber,
      model,
      manufacturer,
      purchaseDate,
      warrantyExpiry,
      value,
      location,
      description,
    });

    return res.status(201).json(new ApiResponse(201, asset, 'Asset created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAssets = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { assetTag: { $regex: search, $options: 'i' } },
        { serialNumber: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ];
    }

    const assets = await Asset.find(query).populate('category', 'name prefix');
    return res.status(200).json(new ApiResponse(200, assets, 'Assets fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id).populate('category', 'name prefix');
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }
    return res.status(200).json(new ApiResponse(200, asset, 'Asset fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }

    if (req.body.category && req.body.category !== String(asset.category)) {
      const categoryRecord = await AssetCategory.findById(req.body.category);
      if (!categoryRecord) {
        throw new ApiError(404, 'New Asset Category not found');
      }
    }

    Object.assign(asset, req.body);
    await asset.save();

    return res.status(200).json(new ApiResponse(200, asset, 'Asset updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }

    await asset.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, 'Asset deleted successfully'));
  } catch (error) {
    next(error);
  }
};
