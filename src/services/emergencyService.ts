import { apiClient } from './apiClient';
import { EmergencyRequest, EmergencyStatus, EmergencyType } from '../types';
import { MOCK_EMERGENCY_REQUESTS } from './mockData';
import { resourceService } from './resourceService';

let localEmergenciesStore: EmergencyRequest[] = [...MOCK_EMERGENCY_REQUESTS];

export const emergencyService = {
  // Get emergency requests (Admin or user specific)
  async getEmergencies(): Promise<EmergencyRequest[]> {
    try {
      const response = await apiClient.get('/emergency');
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }
    return [...localEmergenciesStore];
  },

  // Create Emergency SOS dispatch
  async createEmergencyRequest(data: {
    userName: string;
    userPhone: string;
    location: { coordinates: [number, number] };
    addressString?: string;
    type: EmergencyType;
    description: string;
  }): Promise<EmergencyRequest> {
    try {
      const response = await apiClient.post('/emergency', data);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    // Find nearest hospital and ambulance from resource service
    const nearby = await resourceService.getNearbyResources({
      latitude: data.location.coordinates[1],
      longitude: data.location.coordinates[0],
      radiusKm: 30,
    });

    const nearestHosp = nearby.find(r => r.category === 'Hospitals' || r.category === 'Healthcare');
    const nearestAmb = nearby.find(r => r.category === 'Ambulances');

    const newReq: EmergencyRequest = {
      _id: `emg-${Date.now()}`,
      requestId: `EMG-${Math.floor(10000 + Math.random() * 90000)}`,
      userName: data.userName,
      userPhone: data.userPhone,
      location: {
        type: 'Point',
        coordinates: data.location.coordinates,
      },
      addressString: data.addressString || 'Detected GPS Location',
      type: data.type,
      description: data.description,
      nearestHospital: nearestHosp ? {
        name: nearestHosp.name,
        distance: `${nearestHosp.distanceKm || 1.5} km`,
        phone: nearestHosp.contact.phone,
      } : {
        name: 'City Care Hospital Emergency',
        distance: '1.8 km',
        phone: '+91 98765 43210',
      },
      nearestAmbulance: nearestAmb ? {
        name: nearestAmb.name,
        distance: `${nearestAmb.distanceKm || 1.2} km`,
        phone: nearestAmb.contact.phone,
      } : {
        name: 'RapidRescue Unit #7',
        distance: '1.2 km',
        phone: '+91 99000 11223',
      },
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };

    localEmergenciesStore.unshift(newReq);
    return newReq;
  },

  // Update emergency status (Admin / Responder)
  async updateEmergencyStatus(id: string, status: EmergencyStatus): Promise<EmergencyRequest> {
    try {
      const response = await apiClient.patch(`/emergency/${id}/status`, { status });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const idx = localEmergenciesStore.findIndex(e => e._id === id || e.requestId === id);
    if (idx !== -1) {
      localEmergenciesStore[idx] = {
        ...localEmergenciesStore[idx],
        status,
        resolvedAt: status === 'RESOLVED' || status === 'CANCELLED' ? new Date().toISOString() : undefined,
      };
      return localEmergenciesStore[idx];
    }
    throw new Error('Emergency request not found');
  }
};
