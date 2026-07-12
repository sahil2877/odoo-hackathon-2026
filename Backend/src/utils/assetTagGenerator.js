import mongoose from 'mongoose';

/**
 * Generates the next sequential asset tag based on category prefix or default AF.
 * @param {string} prefix - The category prefix (e.g. LAP, MON)
 * @returns {Promise<string>} Next asset tag (e.g., LAP-0001)
 */
export const generateAssetTag = async (prefix = 'AF') => {
  const Asset = mongoose.model('Asset');
  
  // Find the last created asset with the given prefix
  const regex = new RegExp(`^${prefix}-\\d{4}$`);
  const lastAsset = await Asset.findOne({ assetTag: regex })
    .sort({ createdAt: -1 })
    .select('assetTag')
    .lean();

  let nextNum = 1;
  if (lastAsset && lastAsset.assetTag) {
    const parts = lastAsset.assetTag.split('-');
    const lastNum = parseInt(parts[1], 10);
    if (!isNaN(lastNum)) {
      nextNum = lastNum + 1;
    }
  }

  // Pad to 4 digits (e.g. 0001, 0025, 0100)
  const paddedNum = String(nextNum).padStart(4, '0');
  return `${prefix}-${paddedNum}`;
};
