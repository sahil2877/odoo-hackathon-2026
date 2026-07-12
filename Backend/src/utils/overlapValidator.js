import mongoose from 'mongoose';

/**
 * Validates if a booking request overlaps with any existing approved bookings for the same asset.
 * @param {string} assetId
 * @param {Date} startTime
 * @param {Date} endTime
 * @param {string} [excludeBookingId] - To exclude a specific booking during update
 * @returns {Promise<boolean>} True if overlap exists, false otherwise
 */
export const checkBookingOverlap = async (assetId, startTime, endTime, excludeBookingId = null) => {
  const Booking = mongoose.model('Booking');
  
  const query = {
    asset: assetId,
    status: { $in: ['Approved', 'Pending'] },
    $or: [
      { startTime: { $gte: new Date(startTime), $lt: new Date(endTime) } },
      { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } },
      { startTime: { $lte: new Date(startTime) }, endTime: { $gte: new Date(endTime) } }
    ]
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const overlappingBooking = await Booking.findOne(query);
  return !!overlappingBooking;
};
