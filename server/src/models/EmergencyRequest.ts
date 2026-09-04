import mongoose, { Schema, Document } from 'mongoose';

export interface IEmergencyRequest extends Document {
  requestId: string;
  userId?: mongoose.Types.ObjectId;
  userName: string;
  userPhone: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  addressString?: string;
  type: string;
  description: string;
  status: 'CREATED' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';
  resolvedAt?: Date;
  createdAt: Date;
}

const EmergencyRequestSchema: Schema = new Schema(
  {
    requestId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    addressString: String,
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['CREATED', 'ACKNOWLEDGED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED'],
      default: 'CREATED',
      index: true,
    },
    resolvedAt: Date,
  },
  { timestamps: true }
);

EmergencyRequestSchema.index({ location: '2dsphere' });

export default mongoose.model<IEmergencyRequest>('EmergencyRequest', EmergencyRequestSchema);
