import { AuditCycle } from '../models/AuditCycle.js';
import { AuditItem } from '../models/AuditItem.js';
import { Asset } from '../models/Asset.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createAuditCycle = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    const cycle = await AuditCycle.create({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user._id,
      status: 'Draft',
    });

    const assets = await Asset.find({ status: { $ne: 'Disposed' } });
    const auditItems = assets.map((asset) => ({
      auditCycle: cycle._id,
      asset: asset._id,
      status: 'Pending',
    }));

    if (auditItems.length > 0) {
      await AuditItem.insertMany(auditItems);
    }

    return res.status(201).json(new ApiResponse(201, cycle, 'Audit cycle created and items snapshot successfully'));
  } catch (error) {
    next(error);
  }
};

export const startAuditCycle = async (req, res, next) => {
  try {
    const cycle = await AuditCycle.findById(req.params.id);
    if (!cycle) {
      throw new ApiError(404, 'Audit cycle not found');
    }
    if (cycle.status !== 'Draft') {
      throw new ApiError(400, 'Audit cycle must be in Draft to start');
    }

    cycle.status = 'Active';
    await cycle.save();

    return res.status(200).json(new ApiResponse(200, cycle, 'Audit cycle is now Active'));
  } catch (error) {
    next(error);
  }
};

export const getAuditCycles = async (req, res, next) => {
  try {
    const cycles = await AuditCycle.find().populate('createdBy', 'name email');
    return res.status(200).json(new ApiResponse(200, cycles, 'Audit cycles fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAuditCycleDetails = async (req, res, next) => {
  try {
    const cycle = await AuditCycle.findById(req.params.id).populate('createdBy', 'name email');
    if (!cycle) {
      throw new ApiError(404, 'Audit cycle not found');
    }

    const items = await AuditItem.find({ auditCycle: cycle._id })
      .populate({
        path: 'asset',
        populate: { path: 'category', select: 'name prefix' }
      })
      .populate('auditor', 'name email');

    return res.status(200).json(new ApiResponse(200, { cycle, items }, 'Audit cycle details fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateAuditItem = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (!['Verified', 'Missing', 'Damaged'].includes(status)) {
      throw new ApiError(400, 'Invalid status selection for audit item');
    }

    const item = await AuditItem.findById(req.params.itemId);
    if (!item) {
      throw new ApiError(404, 'Audit item not found');
    }

    item.status = status;
    item.notes = notes || '';
    item.auditor = req.user._id;
    item.verifiedAt = new Date();

    await item.save();

    if (status === 'Missing' || status === 'Damaged') {
      const asset = await Asset.findById(item.asset);
      if (asset) {
        if (status === 'Missing') asset.status = 'Disposed';
        if (status === 'Damaged') asset.status = 'Maintenance';
        await asset.save();
      }
    }

    return res.status(200).json(new ApiResponse(200, item, 'Audit item verified successfully'));
  } catch (error) {
    next(error);
  }
};

export const completeAuditCycle = async (req, res, next) => {
  try {
    const cycle = await AuditCycle.findById(req.params.id);
    if (!cycle) {
      throw new ApiError(404, 'Audit cycle not found');
    }

    cycle.status = 'Completed';
    await cycle.save();

    return res.status(200).json(new ApiResponse(200, cycle, 'Audit cycle marked as Completed'));
  } catch (error) {
    next(error);
  }
};
