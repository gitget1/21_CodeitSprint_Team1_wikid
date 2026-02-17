import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthResponse, User, AuthProfile } from '@/api/auth.api';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  profileImageUrl: string | null;
  setLogin: (data: AuthResponse) => void;
  updateToken: (accessToken: string) => void;
  updateProfile: (profile: AuthProfile) => void;
  setProfileImageUrl: (url: string | null) => void;
  clearLogin: () => void;
}

const authStoreImpl = (
  set: (partial: Partial<AuthState> | ((s: AuthState) => Partial<AuthState>)) => void
): AuthState => ({
  isLoggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  profileImageUrl: null,

  setLogin: (data) =>
    set({
      isLoggedIn: true,
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),

  updateToken: (accessToken) => set({ accessToken }),

  updateProfile: (profile) =>
    set((state) => ({
      user: state.user ? { ...state.user, profile } : null,
    })),

  setProfileImageUrl: (url) => set({ profileImageUrl: url }),

  clearLogin: () =>
    set({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      profileImageUrl: null,
    }),
});

export const useAuthStore = create<AuthState>()(persist(authStoreImpl, { name: 'auth-storage' }));
