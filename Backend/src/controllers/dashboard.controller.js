import { Asset } from '../models/Asset.js';
import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { Booking } from '../models/Booking.js';
import { Allocation } from '../models/Allocation.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalAssets = await Asset.countDocuments();
    
    const available = await Asset.countDocuments({ status: 'Available' });
    const allocated = await Asset.countDocuments({ status: 'Allocated' });
    const maintenance = await Asset.countDocuments({ status: 'Maintenance' });
    const disposed = await Asset.countDocuments({ status: 'Disposed' });

    const valueResult = await Asset.aggregate([
      { $match: { status: { $ne: 'Disposed' } } },
      { $group: { _id: null, totalValue: { $sum: '$value' } } }
    ]);
    const totalValue = valueResult[0]?.totalValue || 0;

    const recentMaintenance = await MaintenanceRequest.find()
      .populate('asset', 'name assetTag')
      .sort({ createdAt: -1 })
      .limit(5);

    const activeBookings = await Booking.find({ status: 'Approved', endTime: { $gte: new Date() } })
      .populate('asset', 'name assetTag')
      .populate('user', 'name')
      .sort({ startTime: 1 })
      .limit(5);

    const activeAllocationsCount = await Allocation.countDocuments({ status: 'Active' });

    const stats = {
      assets: {
        total: totalAssets,
        available,
        allocated,
        maintenance,
        disposed,
        totalValue,
      },
      allocations: {
        activeCount: activeAllocationsCount,
      },
      recentMaintenance,
      activeBookings,
    };

    return res.status(200).json(new ApiResponse(200, stats, 'Dashboard stats fetched successfully'));
  } catch (error) {
    next(error);
  }
};
