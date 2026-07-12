import { MaintenanceRequest } from '../models/MaintenanceRequest.js';
import { Asset } from '../models/Asset.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createMaintenanceRequest = async (req, res, next) => {
  try {
    const { assetId, issueDescription, priority } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      throw new ApiError(404, 'Asset not found');
    }

    const request = await MaintenanceRequest.create({
      asset: assetId,
      reportedBy: req.user._id,
      issueDescription,
      priority: priority || 'Medium',
    });

    asset.status = 'Maintenance';
    await asset.save();

    return res.status(201).json(new ApiResponse(201, request, 'Maintenance request submitted successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateMaintenanceDetails = async (req, res, next) => {
  try {
    const { assignedTo, status, cost, resolutionDetails } = req.body;
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) {
      throw new ApiError(404, 'Maintenance request not found');
    }

    if (assignedTo !== undefined) request.assignedTo = assignedTo;
    if (cost !== undefined) request.cost = cost;
    if (resolutionDetails !== undefined) request.resolutionDetails = resolutionDetails;

    if (status && status !== request.status) {
      request.status = status;
      if (status === 'Resolved') {
        request.resolvedAt = new Date();
        const asset = await Asset.findById(request.asset);
        if (asset) {
          asset.status = 'Available';
          await asset.save();
        }
      }
    }

    await request.save();
    return res.status(200).json(new ApiResponse(200, request, 'Maintenance request updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const getMaintenanceRequests = async (req, res, next) => {
  try {
    const { status, priority, assetId } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assetId) query.asset = assetId;

    if (req.user.role === 'employee') {
      query.reportedBy = req.user._id;
    }

    const requests = await MaintenanceRequest.find(query)
      .populate('asset', 'name assetTag status location')
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, requests, 'Maintenance requests fetched successfully'));
  } catch (error) {
    next(error);
  }
};
