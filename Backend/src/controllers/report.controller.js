import { Asset } from '../models/Asset.js';
import { Allocation } from '../models/Allocation.js';
import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getInventoryReport = async (req, res, next) => {
  try {
    const report = await Asset.aggregate([
      {
        $group: {
          _id: '$category',
          totalCount: { $sum: 1 },
          totalValue: { $sum: '$value' },
          availableCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] }
          },
          allocatedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Allocated'] }, 1, 0] }
          },
          maintenanceCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Maintenance'] }, 1, 0] }
          },
          disposedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Disposed'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'assetcategories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      { $unwind: '$categoryDetails' },
      {
        $project: {
          _id: 1,
          categoryName: '$categoryDetails.name',
          categoryPrefix: '$categoryDetails.prefix',
          totalCount: 1,
          totalValue: 1,
          availableCount: 1,
          allocatedCount: 1,
          maintenanceCount: 1,
          disposedCount: 1
        }
      }
    ]);

    return res.status(200).json(new ApiResponse(200, report, 'Inventory category report generated successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAllocationHistoryReport = async (req, res, next) => {
  try {
    const report = await Allocation.find()
      .populate('asset', 'name assetTag status')
      .populate('user', 'name email')
      .populate('department', 'name code')
      .populate('allocatedBy', 'name email')
      .sort({ allocatedAt: -1 });

    return res.status(200).json(new ApiResponse(200, report, 'Allocation history report generated successfully'));
  } catch (error) {
    next(error);
  }
};

export const getMaintenanceReport = async (req, res, next) => {
  try {
    const stats = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: '$cost' },
          totalRequestsCount: { $sum: 1 },
          resolvedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] }
          },
          pendingCount: {
            $sum: { $cond: [{ $ne: ['$status', 'Resolved'] }, 1, 0] }
          }
        }
      }
    ]);

    const breakdown = await MaintenanceRequest.find()
      .populate('asset', 'name assetTag')
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    const report = {
      summary: stats[0] || { totalCost: 0, totalRequestsCount: 0, resolvedCount: 0, pendingCount: 0 },
      breakdown,
    };

    return res.status(200).json(new ApiResponse(200, report, 'Maintenance report generated successfully'));
  } catch (error) {
    next(error);
  }
};
