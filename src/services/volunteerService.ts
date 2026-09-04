import { apiClient } from './apiClient';
import { Volunteer } from '../types';
import { MOCK_VOLUNTEERS } from './mockData';

let localVolunteersStore: Volunteer[] = [...MOCK_VOLUNTEERS];

export const volunteerService = {
  async getVolunteers(): Promise<Volunteer[]> {
    try {
      const response = await apiClient.get('/volunteers');
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }
    return [...localVolunteersStore];
  },

  async registerVolunteer(data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    skills: string[];
    availability: 'IMMEDIATE' | 'WEEKENDS' | 'PART_TIME' | 'ON_CALL';
    preferredRole: string;
  }): Promise<Volunteer> {
    try {
      const response = await apiClient.post('/volunteers', data);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const newVol: Volunteer = {
      _id: `vol-${Date.now()}`,
      userId: 'user-curr',
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      skills: data.skills,
      availability: data.availability,
      preferredRole: data.preferredRole,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    localVolunteersStore.unshift(newVol);
    return newVol;
  }
};
