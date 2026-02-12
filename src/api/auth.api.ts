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
export const signUp = async (body: SignUpRequest): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/auth/signUp', body);
  return response.data;
};

/**
 * 로그인 (POST /auth/signIn)
 */
export const signIn = async (body: SignInRequest): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/auth/signIn', body);
  return response.data;
};

/**
 * 토큰 갱신 (POST /auth/refresh-token)
 */
export const refreshToken = async (body: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const response = await instance.post<RefreshTokenResponse>('/auth/refresh-token', body);
  return response.data;
};
