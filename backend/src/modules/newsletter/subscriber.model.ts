import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  active: boolean;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

export const Subscriber = mongoose.model<ISubscriber>('Subscriber', subscriberSchema);
