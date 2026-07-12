import mongoose from 'mongoose';

const auditCycleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Audit title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed'],
      default: 'Draft',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AuditCycle = mongoose.model('AuditCycle', auditCycleSchema);
