import mongoose from 'mongoose';

export interface Review {
  userId: string;
  restaurantId: string;
  message: string; // inputted by user
  rating: number; // inputted by user
  visittedAt: Date; // inputted by user
}

interface ReviewDocument extends mongoose.Document {
  userId: string;
  restaurantId: string;
  message: string; // inputted by user
  rating: number; // inputted by user
  visittedAt: Date; // inputted by user
}

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true },
    restaurantId: { type: String, index: true },
    message: { type: String },
    rating: { type: String },
    visittedAt: { type: Date },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

ReviewSchema.index({ createdAt: -1 });
ReviewSchema.index({ userId: 1 });  // add indexes for stuffs we will use for sort/filter later
ReviewSchema.index({ restaurantId: 1 });  // add indexes for stuffs we will use for sort/filter later
ReviewSchema.index({ restaurantId: 1, createdAt: -1 });  // add indexes for stuffs we will use for sort/filter later

export default mongoose.model<ReviewDocument>('Review', ReviewSchema);
