import { Allocation } from '../models/Allocation.js';
import { Asset } from '../models/Asset.js';
import { User } from '../models/User.js';
import { Department } from '../models/Department.js';
import { TransferRequest } from '../models/TransferRequest.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const allocateAsset = async (req, res, next) => {
  try {
    const { assetId, userId, departmentId, notes } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }
    if (asset.status !== 'Available') {
      throw new ApiError(400, `Asset is currently ${asset.status} and cannot be allocated`);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

    const allocation = await Allocation.create({
      asset: assetId,
      user: userId,
      department: departmentId,
      allocatedBy: req.user._id,
      notes,
    });

    asset.status = 'Allocated';
    await asset.save();

    return res.status(201).json(new ApiResponse(201, allocation, 'Asset allocated successfully'));
  } catch (error) {
    next(error);
  }
};

export const returnAsset = async (req, res, next) => {
  try {
    const { notes } = req.body;
    const allocation = await Allocation.findById(req.params.id);
    if (!allocation) {
      throw new ApiError(404, 'Allocation record not found');
    }
    if (allocation.status === 'Returned') {
      throw new ApiError(400, 'Asset has already been returned');
    }

    allocation.status = 'Returned';
    allocation.returnedAt = new Date();
    if (notes) allocation.notes = `${allocation.notes || ''}\nReturn Note: ${notes}`;
    await allocation.save();

    const asset = await Asset.findById(allocation.asset);
    if (asset) {
      asset.status = 'Available';
      await asset.save();
    }

    return res.status(200).json(new ApiResponse(200, allocation, 'Asset returned successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAllocations = async (req, res, next) => {
  try {
    const { status, userId, assetId } = req.query;
    const query = {};

    if (status) query.status = status;
    if (userId) query.user = userId;
    if (assetId) query.asset = assetId;

    if (req.user.role === 'employee') {
      query.user = req.user._id;
    }

    const allocations = await Allocation.find(query)
      .populate('asset', 'name assetTag status')
      .populate('user', 'name email role')
      .populate('department', 'name code')
      .populate('allocatedBy', 'name email');

    return res.status(200).json(new ApiResponse(200, allocations, 'Allocations fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const requestTransfer = async (req, res, next) => {
  try {
    const { assetId, newHolderId, comments } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }

    const currentAllocation = await Allocation.findOne({ asset: assetId, status: 'Active' });
    if (!currentAllocation) {
      throw new ApiError(400, 'Asset is not currently allocated to anyone');
    }

    const request = await TransferRequest.create({
      asset: assetId,
      currentHolder: currentAllocation.user,
      newHolder: newHolderId,
      requestedBy: req.user._id,
      comments,
    });

    return res.status(201).json(new ApiResponse(201, request, 'Transfer request created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getTransferRequests = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === 'employee') {
      query.$or = [
        { currentHolder: req.user._id },
        { newHolder: req.user._id },
        { requestedBy: req.user._id }
      ];
    }

    const requests = await TransferRequest.find(query)
      .populate('asset', 'name assetTag status')
      .populate('currentHolder', 'name email')
      .populate('newHolder', 'name email')
      .populate('requestedBy', 'name email')
      .populate('approvedBy', 'name email');

    return res.status(200).json(new ApiResponse(200, requests, 'Transfer requests fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const approveOrRejectTransfer = async (req, res, next) => {
  try {
    const { status, comments } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      throw new ApiError(400, 'Invalid status selection');
    }

    const request = await TransferRequest.findById(req.params.id);
    if (!request) {
      throw new ApiError(404, 'Transfer request not found');
    }
    if (request.status !== 'Pending') {
      throw new ApiError(400, 'Transfer request has already been processed');
    }

    request.status = status;
    request.approvedBy = req.user._id;
    if (comments) request.comments = `${request.comments || ''}\nReview comment: ${comments}`;
    await request.save();

    if (status === 'Approved') {
      const currentAllocation = await Allocation.findOne({ asset: request.asset, user: request.currentHolder, status: 'Active' });
      if (currentAllocation) {
        currentAllocation.status = 'Returned';
        currentAllocation.returnedAt = new Date();
        await currentAllocation.save();
      }

      const recipient = await User.findById(request.newHolder);
      await Allocation.create({
        asset: request.asset,
        user: request.newHolder,
        department: recipient?.department || currentAllocation?.department,
        allocatedBy: req.user._id,
        notes: `Transferred from ${request.currentHolder}. Comments: ${comments || ''}`,
      });
    }

    return res.status(200).json(new ApiResponse(200, request, `Transfer request status updated to ${status}`));
  } catch (error) {
    next(error);
  }
};
