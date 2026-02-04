import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/api/auth.api';

interface AuthState {
  // 상태
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;

  // 액션
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      // 로그인 시 인증 정보 저장
      setAuth: (user, accessToken, refreshToken) => {
        // localStorage에도 저장 (axios 인터셉터용)
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
        set({
          user,
          accessToken,
          refreshToken,
          isLoggedIn: true,
        });
      },

      // 사용자 정보만 업데이트
      setUser: (user) => set({ user }),

      // 액세스 토큰 갱신
      setAccessToken: (token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }
        set({ accessToken: token });
      },

      // 로그아웃
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
