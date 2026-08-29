import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  solution: string;
  features: string[];
  result: string;
  testimonial?: string;
  screenshots: string[];
  techUsed: string[];
  published: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const caseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    challenge: { type: String, required: true },
    approach: { type: String, required: true },
    solution: { type: String, required: true },
    features: [{ type: String }],
    result: { type: String, required: true },
    testimonial: { type: String },
    screenshots: [{ type: String }],
    techUsed: [{ type: String }],
    published: { type: Boolean, default: false },
    featuredImage: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

caseStudySchema.index({ slug: 1 });
caseStudySchema.index({ published: 1, order: 1, createdAt: -1 });

export const CaseStudy = mongoose.model<ICaseStudy>('CaseStudy', caseStudySchema);
