import { apiClient } from './apiClient';
import { Resource, ResourceCategory } from '../types';
import { INITIAL_MOCK_RESOURCES } from './mockData';

// Helper to calculate distance in km using Haversine formula
export const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
};

let localResourcesStore: Resource[] = [...INITIAL_MOCK_RESOURCES];

export const resourceService = {
  // Get all resources with optional category, search, and verification filters
  async getResources(params?: {
    category?: string;
    search?: string;
    verifiedOnly?: boolean;
    city?: string;
  }): Promise<Resource[]> {
    try {
      const response = await apiClient.get('/resources', { params });
      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch {
      // Failover to local store
    }

    let filtered = [...localResourcesStore];

    if (params?.category && params.category !== 'All') {
      filtered = filtered.filter(r => r.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params?.verifiedOnly) {
      filtered = filtered.filter(r => r.verified);
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.address.fullAddress.toLowerCase().includes(q) ||
        r.address.city.toLowerCase().includes(q) ||
        r.address.pincode.includes(q)
      );
    }

    return filtered;
  },

  // Get single resource by ID
  async getResourceById(id: string): Promise<Resource | null> {
    try {
      const response = await apiClient.get(`/resources/${id}`);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    return localResourcesStore.find(r => r._id === id || r.id === id) || null;
  },

  // Geospatial nearby search
  async getNearbyResources(params: {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    category?: string;
    verifiedOnly?: boolean;
  }): Promise<Resource[]> {
    const radius = params.radiusKm || 25;

    try {
      const response = await apiClient.get('/resources/nearby', { params });
      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    // Compute distance for each local resource
    let calculated = localResourcesStore.map(r => {
      const dist = calculateDistanceKm(
        params.latitude,
        params.longitude,
        r.location.coordinates[1],
        r.location.coordinates[0]
      );
      return { ...r, distanceKm: dist };
    });

    // Filter within radius
    calculated = calculated.filter(r => (r.distanceKm || 0) <= radius);

    if (params.category && params.category !== 'All') {
      calculated = calculated.filter(r => r.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params.verifiedOnly) {
      calculated = calculated.filter(r => r.verified);
    }

    // Sort by distance ASC
    calculated.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    return calculated;
  },

  // Admin create resource
  async createResource(resourceData: Partial<Resource>): Promise<Resource> {
    try {
      const response = await apiClient.post('/resources', resourceData);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const newRes: Resource = {
      _id: `res-${Date.now()}`,
      name: resourceData.name || 'New Resource Center',
      category: (resourceData.category as ResourceCategory) || 'Healthcare',
      description: resourceData.description || 'Verified community support resource.',
      contact: resourceData.contact || { phone: '+91 99999 88888' },
      address: resourceData.address || {
        street: 'Main Road',
        city: 'Central City',
        state: 'State',
        pincode: '400001',
        fullAddress: 'Main Road, Central City',
      },
      location: resourceData.location || {
        type: 'Point',
        coordinates: [72.8777, 19.0760],
      },
      availability: resourceData.availability || { status: 'AVAILABLE' },
      operatingHours: resourceData.operatingHours || '24/7 Open',
      verified: false, // Default false until admin approves
      rating: 4.5,
      reviewsCount: 1,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localResourcesStore.unshift(newRes);
    return newRes;
  },

  // Toggle verification status (Admin)
  async toggleVerifyResource(id: string, verified: boolean): Promise<Resource> {
    try {
      const response = await apiClient.patch(`/resources/${id}/verify`, { verified });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const idx = localResourcesStore.findIndex(r => r._id === id);
    if (idx !== -1) {
      localResourcesStore[idx] = {
        ...localResourcesStore[idx],
        verified,
        updatedAt: new Date().toISOString(),
      };
      return localResourcesStore[idx];
    }
    throw new Error('Resource not found');
  },

  // Update resource availability (Beds, Oxygen, status)
  async updateAvailability(id: string, availabilityData: Partial<Resource['availability']>): Promise<Resource> {
    try {
      const response = await apiClient.patch(`/resources/${id}/availability`, availabilityData);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const idx = localResourcesStore.findIndex(r => r._id === id);
    if (idx !== -1) {
      localResourcesStore[idx] = {
        ...localResourcesStore[idx],
        availability: {
          ...localResourcesStore[idx].availability,
          ...availabilityData,
          lastUpdated: new Date().toISOString(),
        },
        updatedAt: new Date().toISOString(),
      };
      return localResourcesStore[idx];
    }
    throw new Error('Resource not found');
  },

  // Delete resource (Admin)
  async deleteResource(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/resources/${id}`);
      return true;
    } catch {
      // Failover
    }
    localResourcesStore = localResourcesStore.filter(r => r._id !== id);
    return true;
  }
};
