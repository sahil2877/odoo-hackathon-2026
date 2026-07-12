import mongoose from 'mongoose';

const assetCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, 'Prefix is required for auto-tag generation'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [5, 'Prefix cannot exceed 5 characters'],
    },
  },
  {
    timestamps: true,
  }
);

export const AssetCategory = mongoose.model('AssetCategory', assetCategorySchema);
