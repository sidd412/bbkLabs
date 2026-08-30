import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  company: string;
  message: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
