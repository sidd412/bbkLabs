import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  client: string; // Could be a reference to Lead or Contact in the future
  industry?: string;
  status: 'started' | 'ongoing' | 'completed' | 'on-hold';
  totalRevenue: number;
  advancePaid: number;
  services: string[];
  startDate: Date;
  deadline?: Date;
  maintenanceRenewalDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, trim: true },
    status: {
      type: String,
      enum: ['started', 'ongoing', 'completed', 'on-hold'],
      default: 'started',
    },
    totalRevenue: { type: Number, required: true, default: 0 },
    advancePaid: { type: Number, required: true, default: 0 },
    services: [{ type: String }],
    startDate: { type: Date, required: true, default: Date.now },
    deadline: { type: Date },
    maintenanceRenewalDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1 });
projectSchema.index({ client: 1 });
projectSchema.index({ maintenanceRenewalDate: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
