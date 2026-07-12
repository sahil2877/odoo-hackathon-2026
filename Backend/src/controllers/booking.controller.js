import { Booking } from '../models/Booking.js';
import { Asset } from '../models/Asset.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { checkBookingOverlap } from '../utils/overlapValidator.js';

export const createBooking = async (req, res, next) => {
  try {
    const { asset, startTime, endTime, purpose } = req.body;

    const assetRecord = await Asset.findById(asset);
    if (!assetRecord) {
      throw new ApiError(404, 'Asset not found');
    }

    const isOverlapping = await checkBookingOverlap(asset, startTime, endTime);
    if (isOverlapping) {
      throw new ApiError(400, 'This slot overlaps with an existing booking for the selected asset');
    }

    const booking = await Booking.create({
      asset,
      user: req.user._id,
      startTime,
      endTime,
      purpose,
    });

    return res.status(201).json(new ApiResponse(201, booking, 'Booking requested successfully'));
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { assetId, status } = req.query;
    const query = {};

    if (assetId) query.asset = assetId;
    if (status) query.status = status;

    if (req.user.role === 'employee') {
      query.user = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate('asset', 'name assetTag status location')
      .populate('user', 'name email role')
      .sort({ startTime: -1 });

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected', 'Cancelled'].includes(status)) {
      throw new ApiError(400, 'Invalid status update');
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (status === 'Cancelled' && String(booking.user) !== String(req.user._id)) {
      throw new ApiError(403, 'Forbidden: You can only cancel your own bookings');
    }

    if (['Approved', 'Rejected'].includes(status) && !['admin', 'asset_manager', 'dept_head'].includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden: Only managers and admins can approve/reject bookings');
    }

    if (status === 'Approved') {
      const isOverlapping = await checkBookingOverlap(booking.asset, booking.startTime, booking.endTime, booking._id);
      if (isOverlapping) {
        throw new ApiError(400, 'Cannot approve: This slot overlaps with another approved/pending booking');
      }
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json(new ApiResponse(200, booking, `Booking status set to ${status}`));
  } catch (error) {
    next(error);
  }
};

export const updateBookingDetails = async (req, res, next) => {
  try {
    const { startTime, endTime, purpose } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (String(booking.user) !== String(req.user._id)) {
      throw new ApiError(403, 'Forbidden: You can only update your own bookings');
    }

    if (booking.status !== 'Pending') {
      throw new ApiError(400, 'Only pending bookings can be updated');
    }

    const checkStart = startTime || booking.startTime;
    const checkEnd = endTime || booking.endTime;

    if (startTime || endTime) {
      const isOverlapping = await checkBookingOverlap(booking.asset, checkStart, checkEnd, booking._id);
      if (isOverlapping) {
        throw new ApiError(400, 'The updated timing overlaps with another booking');
      }
    }

    if (startTime) booking.startTime = startTime;
    if (endTime) booking.endTime = endTime;
    if (purpose) booking.purpose = purpose;

    await booking.save();

    return res.status(200).json(new ApiResponse(200, booking, 'Booking details updated successfully'));
  } catch (error) {
    next(error);
  }
};
