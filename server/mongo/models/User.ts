import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  id: string;
  name: string;
  permissions: string[];
  email: string;
}

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, index: true, unique: true },
    name: { type: String, index: true },
    permissions: [String],
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
