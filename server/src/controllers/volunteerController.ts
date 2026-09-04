import { Request, Response } from 'express';
import Volunteer from '../models/Volunteer';

export const getVolunteers = async (req: Request, res: Response) => {
  try {
    const list = await Volunteer.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createVolunteer = async (req: Request, res: Response) => {
  try {
    const newVol = new Volunteer(req.body);
    await newVol.save();
    return res.status(201).json({ success: true, data: newVol });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
