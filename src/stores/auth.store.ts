import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse, User, AuthProfile } from '@/api/auth.api';

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setLogin: (data: AuthResponse) => void;
    updateToken: (accessToken: string) => void;
    updateProfile: (profile: AuthProfile) => void;
    clearLogin: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        isLoggedIn: false,
        user: null,
        accessToken: null,
        refreshToken: null,
  
        setLogin: (data) =>
          set({
            isLoggedIn: true,
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),

        updateToken: (accessToken: string) =>
            set({accessToken: accessToken,}),

        updateProfile: (profile: AuthProfile) =>
            set((state) => ({
                user: state.user ? { ...state.user, profile } : null,
            })),
  
        clearLogin: () =>
          set({
            isLoggedIn: false,
            user: null,
            accessToken: null,
            refreshToken: null,
          }),
      }),
      {
        name: 'auth-storage', 
      }
    )
  );