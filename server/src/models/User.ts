import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN' | 'RESOURCE_PROVIDER' | 'VOLUNTEER';
  phone?: string;
  city?: string;
  savedResources: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN', 'RESOURCE_PROVIDER', 'VOLUNTEER'], default: 'USER' },
    phone: String,
    city: String,
    savedResources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
