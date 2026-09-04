import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: 'IMMEDIATE' | 'WEEKENDS' | 'PART_TIME' | 'ON_CALL';
  preferredRole: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  createdAt: Date;
}

const VolunteerSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    skills: [String],
    availability: { type: String, enum: ['IMMEDIATE', 'WEEKENDS', 'PART_TIME', 'ON_CALL'], default: 'IMMEDIATE' },
    preferredRole: { type: String, default: 'General Support' },
    status: { type: String, enum: ['ACTIVE', 'PENDING', 'INACTIVE'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

export default mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
