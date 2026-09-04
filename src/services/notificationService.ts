import { apiClient } from './apiClient';
import { NotificationItem } from '../types';
import { MOCK_NOTIFICATIONS } from './mockData';

let localNotifsStore: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const response = await apiClient.get('/notifications');
      if (response.data?.success) {
        return response.data.data;
      }
    } catch {
      // Failover
    }
    return [...localNotifsStore];
  },

  async markAsRead(id: string): Promise<void> {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      // Failover
    }
    localNotifsStore = localNotifsStore.map(n => (n._id === id ? { ...n, read: true } : n));
  },

  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.patch('/notifications/read-all');
    } catch {
      // Failover
    }
    localNotifsStore = localNotifsStore.map(n => ({ ...n, read: true }));
  }
};
