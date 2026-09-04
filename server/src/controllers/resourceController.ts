import { Request, Response } from 'express';
import Resource from '../models/Resource';
import AuditLog from '../models/AuditLog';

export const getResources = async (req: Request, res: Response) => {
  try {
    const { category, search, verifiedOnly, city } = req.query;
    const filter: any = { status: 'ACTIVE' };

    if (category && category !== 'All') {
      filter.category = new RegExp(String(category), 'i');
    }

    if (verifiedOnly === 'true') {
      filter.verified = true;
    }

    if (city) {
      filter['address.city'] = new RegExp(String(city), 'i');
    }

    if (search) {
      const q = new RegExp(String(search), 'i');
      filter.$or = [
        { name: q },
        { description: q },
        { 'address.fullAddress': q },
        { 'address.city': q },
        { 'address.pincode': q },
      ];
    }

    const resources = await Resource.find(filter).sort({ verified: -1, updatedAt: -1 });
    return res.json({ success: true, count: resources.length, data: resources });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    return res.json({ success: true, data: resource });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getNearbyResources = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, radiusKm, category, verifiedOnly } = req.query;
    const lat = Number(latitude) || 19.0760;
    const lng = Number(longitude) || 72.8777;
    const maxDistanceMeters = (Number(radiusKm) || 25) * 1000;

    const queryFilter: any = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceMeters,
        },
      },
      status: 'ACTIVE',
    };

    if (category && category !== 'All') {
      queryFilter.category = new RegExp(String(category), 'i');
    }

    if (verifiedOnly === 'true') {
      queryFilter.verified = true;
    }

    const resources = await Resource.find(queryFilter);
    return res.json({ success: true, count: resources.length, data: resources });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    return res.status(201).json({ success: true, data: newResource });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyResource = async (req: Request, res: Response) => {
  try {
    const { verified } = req.body;
    const resource = await Resource.findByIdAndUpdate(req.params.id, { verified }, { new: true });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });

    // Log action
    await AuditLog.create({
      action: 'ADMIN_VERIFIED_RESOURCE',
      resourceId: resource._id,
      newValue: { verified },
    });

    return res.json({ success: true, data: resource });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });

    resource.availability = {
      ...resource.availability,
      ...req.body,
      lastUpdated: new Date(),
    };
    await resource.save();

    await AuditLog.create({
      action: 'ADMIN_UPDATED_AVAILABILITY',
      resourceId: resource._id,
      newValue: req.body,
    });

    return res.json({ success: true, data: resource });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Resource deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
