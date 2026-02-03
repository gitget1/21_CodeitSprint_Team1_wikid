import { apiClient } from '@/lib/api/client';
import type { LoginRequest, SignUpRequest, AuthResponse } from './types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signIn', data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signUp', data);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },
};
