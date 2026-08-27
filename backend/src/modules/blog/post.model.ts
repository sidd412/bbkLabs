import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  readTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, default: 'BBK Labs' },
    category: { type: String, required: true, trim: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    featuredImage: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    readTime: { type: Number },
  },
  { timestamps: true }
);

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ published: 1, createdAt: -1 });
blogPostSchema.index({ category: 1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
