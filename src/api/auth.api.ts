import type {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from '@/types/auth.types';

import instance from './axios';

export type {
  AuthProfile,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from '@/types/auth.types';

/**
 * 회원가입 (POST /auth/signUp)
 */
export const signUp = (body: SignUpRequest) => {
  return instance.post<AuthResponse>('/auth/signUp', body);
};

/**
 * 로그인 (POST /auth/signIn)
 */
export const signIn = (body: SignInRequest) => {
  return instance.post<AuthResponse>('/auth/signIn', body);
};

/**
 * 토큰 갱신 (POST /auth/refresh-token)
 */
export const refreshToken = (body: RefreshTokenRequest) => {
  return instance.post<RefreshTokenResponse>('/auth/refresh-token', body);
};
