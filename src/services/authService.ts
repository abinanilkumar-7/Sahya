import { apiClient } from './apiClient';
import { User, UserRole } from '../types';

const MOCK_USER: User = {
  _id: 'usr-admin-1',
  name: 'Sahya Admin',
  email: 'admin@sahya.org',
  role: 'ADMIN',
  phone: '+91 98765 00000',
  city: 'Central City',
  savedResources: ['res-1', 'res-3'],
  createdAt: new Date().toISOString(),
};

export const authService = {
  async login(email: string, pass: string): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post('/auth/login', { email, password: pass });
      if (response.data?.success) {
        localStorage.setItem('sahya_token', response.data.data.token);
        localStorage.setItem('sahya_user', JSON.stringify(response.data.data.user));
        return response.data.data;
      }
    } catch {
      // Failover for local demonstration
    }

    const role: UserRole = email.includes('admin') ? 'ADMIN' : email.includes('volunteer') ? 'VOLUNTEER' : 'USER';
    const user: User = {
      ...MOCK_USER,
      _id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
    };
    const token = 'mock_jwt_token_sahya_' + Date.now();

    localStorage.setItem('sahya_token', token);
    localStorage.setItem('sahya_user', JSON.stringify(user));
    return { user, token };
  },

  async register(name: string, email: string, pass: string, role: UserRole = 'USER', phone?: string): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password: pass, role, phone });
      if (response.data?.success) {
        localStorage.setItem('sahya_token', response.data.data.token);
        localStorage.setItem('sahya_user', JSON.stringify(response.data.data.user));
        return response.data.data;
      }
    } catch {
      // Failover
    }

    const user: User = {
      _id: `usr-${Date.now()}`,
      name,
      email,
      role,
      phone: phone || '+91 98765 11111',
      savedResources: [],
      createdAt: new Date().toISOString(),
    };
    const token = 'mock_jwt_token_sahya_' + Date.now();

    localStorage.setItem('sahya_token', token);
    localStorage.setItem('sahya_user', JSON.stringify(user));
    return { user, token };
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('sahya_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('sahya_token');
    localStorage.removeItem('sahya_user');
  }
};
