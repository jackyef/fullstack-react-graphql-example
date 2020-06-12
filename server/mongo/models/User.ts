import mongoose from 'mongoose';

export interface User {
  id: string;
  name: string;
  role: 'user' | 'owner' | 'admin';
  email: string;
}

interface UserDocument extends mongoose.Document {
  id: string;
  name: string;
  role: 'user' | 'owner' | 'admin';
  email: string;
}

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, index: true, unique: true },
    name: { type: String, index: true },
    role: { type: String },
    email: { type: String, index: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

UserSchema.index({ createdAt: -1 });

export default mongoose.model<UserDocument>('User', UserSchema);
