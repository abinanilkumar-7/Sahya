import { Request, Response } from 'express';
import EmergencyRequest from '../models/EmergencyRequest';

export const getEmergencies = async (req: Request, res: Response) => {
  try {
    const list = await EmergencyRequest.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const requestId = `EMG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq = new EmergencyRequest({
      ...req.body,
      requestId,
      status: 'CREATED',
    });
    await newReq.save();
    return res.status(201).json({ success: true, data: newReq });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEmergencyStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const reqDoc = await EmergencyRequest.findByIdAndUpdate(
      req.params.id,
      {
        status,
        resolvedAt: status === 'RESOLVED' || status === 'CANCELLED' ? new Date() : undefined,
      },
      { new: true }
    );
    if (!reqDoc) return res.status(404).json({ success: false, message: 'Emergency request not found' });
    return res.json({ success: true, data: reqDoc });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
