import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { useAuthStore } from '@/stores/auth.store';
import { authApi } from '@/api/auth.api';
import type { SignInRequest, SignUpRequest } from '@/api/auth.api';

/**
 * 인증 관련 훅
 * - 로그인, 회원가입, 로그아웃 기능
 * - 인증 상태 확인
 */
export function useAuth() {
  const router = useRouter();
  const { user, isLoggedIn, setAuth, logout: clearAuth } = useAuthStore();

  // 로그인
  const login = useCallback(
    async (data: SignInRequest) => {
      const response = await authApi.signIn(data);
      setAuth(response.user, response.accessToken, response.refreshToken);
      return response;
    },
    [setAuth]
  );

  // 회원가입
  const signUp = useCallback(
    async (data: SignUpRequest) => {
      const response = await authApi.signUp(data);
      setAuth(response.user, response.accessToken, response.refreshToken);
      return response;
    },
    [setAuth]
  );

  // 로그아웃
  const logout = useCallback(() => {
    clearAuth();
    router.push('/login');
  }, [clearAuth, router]);

  // 내 정보 새로고침
  const refreshUser = useCallback(async () => {
    try {
      const user = await authApi.getMe();
      useAuthStore.getState().setUser(user);
      return user;
    } catch (error) {
      // 토큰 만료 등의 이유로 실패 시 로그아웃
      clearAuth();
      throw error;
    }
  }, [clearAuth]);

  return {
    user,
    isLoggedIn,
    login,
    signUp,
    logout,
    refreshUser,
  };
}

export default useAuth;
