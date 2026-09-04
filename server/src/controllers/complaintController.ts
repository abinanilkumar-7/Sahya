import { Request, Response } from 'express';
import Complaint from '../models/Complaint';

export const getComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: complaints.length, data: complaints });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createComplaint = async (req: Request, res: Response) => {
  try {
    const newComp = new Complaint(req.body);
    await newComp.save();
    return res.status(201).json({ success: true, data: newComp });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
  try {
    const { status, adminResponse } = req.body;
    const comp = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminResponse },
      { new: true }
    );
    if (!comp) return res.status(404).json({ success: false, message: 'Complaint not found' });
    return res.json({ success: true, data: comp });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
