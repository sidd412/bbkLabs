import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  businessType?: string;
  serviceNeeded: string;
  requirement?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed';
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    businessType: { type: String, trim: true },
    serviceNeeded: {
      type: String,
      required: true,
      enum: [
        'website',
        'software',
        'mobile-app',
        'ai-automation',
        'seo-digital-growth',
        'business-automation',
        'not-sure',
        'other',
      ],
    },
    requirement: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
      default: 'new',
    },
    source: { type: String, trim: true, default: 'website' },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
