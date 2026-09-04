import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  category: string;
  description: string;
  contact: {
    phone: string;
    altPhone?: string;
    email?: string;
    website?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
  };
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  availability: {
    beds?: number;
    icuBeds?: number;
    oxygenCylinders?: number;
    foodPackets?: number;
    bloodGroupsAvailable?: string[];
    status: 'AVAILABLE' | 'LIMITED' | 'FULL' | 'CLOSED';
    notes?: string;
    lastUpdated?: Date;
  };
  operatingHours: string;
  verified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    contact: {
      phone: { type: String, required: true },
      altPhone: String,
      email: String,
      website: String,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true, index: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true, index: true },
      fullAddress: { type: String, required: true },
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    availability: {
      beds: Number,
      icuBeds: Number,
      oxygenCylinders: Number,
      foodPackets: Number,
      bloodGroupsAvailable: [String],
      status: { type: String, enum: ['AVAILABLE', 'LIMITED', 'FULL', 'CLOSED'], default: 'AVAILABLE' },
      notes: String,
      lastUpdated: { type: Date, default: Date.now },
    },
    operatingHours: { type: String, default: '24/7 Open' },
    verified: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'PENDING'], default: 'ACTIVE', index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// 2dsphere index for geospatial nearby queries
ResourceSchema.index({ location: '2dsphere' });

export default mongoose.model<IResource>('Resource', ResourceSchema);
