import type { ChangePasswordRequest, UserMeResponse } from '@/types/user.types';

import instance from './axios';

// 사용자 API

/**
 * 로그인한 사용자 정보 조회 (GET /users/me)
 */
export const getMe = async (): Promise<UserMeResponse> => {
  const response = await instance.get<UserMeResponse>('/users/me');
  return response.data;
};

/**
 * 비밀번호 변경 (PATCH /users/me/password)
 */
export const changePassword = async (data: ChangePasswordRequest): Promise<UserMeResponse> => {
  const response = await instance.patch<UserMeResponse>('/users/me/password', data);
  return response.data;
};
