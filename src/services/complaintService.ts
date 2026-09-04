import { apiClient } from './apiClient';
import { Complaint, ComplaintPriority, ComplaintStatus } from '../types';
import { MOCK_COMPLAINTS } from './mockData';

let localComplaintsStore: Complaint[] = [...MOCK_COMPLAINTS];

export const complaintService = {
  async getComplaints(): Promise<Complaint[]> {
    try {
      const response = await apiClient.get('/complaints');
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }
    return [...localComplaintsStore];
  },

  async createComplaint(data: {
    userName: string;
    userEmail: string;
    resourceId?: string;
    resourceName?: string;
    subject: string;
    description: string;
    priority: ComplaintPriority;
  }): Promise<Complaint> {
    try {
      const response = await apiClient.post('/complaints', data);
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const newComp: Complaint = {
      _id: `cmp-${Date.now()}`,
      userId: 'user-curr',
      userName: data.userName,
      userEmail: data.userEmail,
      resourceId: data.resourceId,
      resourceName: data.resourceName,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    localComplaintsStore.unshift(newComp);
    return newComp;
  },

  async updateComplaintStatus(id: string, status: ComplaintStatus, adminResponse?: string): Promise<Complaint> {
    try {
      const response = await apiClient.patch(`/complaints/${id}/status`, { status, adminResponse });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const idx = localComplaintsStore.findIndex(c => c._id === id);
    if (idx !== -1) {
      localComplaintsStore[idx] = {
        ...localComplaintsStore[idx],
        status,
        adminResponse: adminResponse || localComplaintsStore[idx].adminResponse,
        updatedAt: new Date().toISOString(),
      };
      return localComplaintsStore[idx];
    }
    throw new Error('Complaint not found');
  }
};
