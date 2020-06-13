import mongoose from 'mongoose';

export interface Restaurant {
  name: string;
  description: string;
  address: string;
  phone: string;
  ownerId: string;
  // we are not going to upload image to mongo, will think of another way
  // considering using github as free cdn? https://raw.githubusercontent.com/jackyef/test-db/master/test.jpeg
  imageUrl: string; 
  
  // average rating of the restauran
  // Will be updated as it gets new reviews
  // Will be updated when a review is deleted as well
  rating: number;

  // number of reviews the restaurant has received
  // storing this allow us to calculate average faster
  // will be updated when a review is added or deleted
  reviewsCount: number;

  // keep track of the lowest and highest review the restaurant has gotten.
  // lowestReview?: Review;
  // highestReview?: Review;
}

interface RestaurantDocument extends mongoose.Document {
  name: string;
  description: string;
  address: string;
  phone: string;
  ownerId: string;
  imageUrl: string; 
  rating: number;
  reviewsCount: number;
}

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    ownerId: { type: String, index: true },
    imageUrl: { type: String },
    rating: { type: Number, index: true },
    reviewsCount: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

RestaurantSchema.index({ createdAt: -1 });
RestaurantSchema.index({ rating: -1 });  // add indexes for stuffs we will use for sort/filter later
RestaurantSchema.index({ ownerId: 1 });  // add indexes for stuffs we will use for sort/filter later

export default mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema);
