import type {
  CreateProfileRequest,
  Profile,
  ProfileListParams,
  ProfileListResponse,
  ProfilePingResponse,
  UpdateProfileRequest,
} from '@/types/wiki.types';

import instance from './axios';

export type {
  CreateProfileRequest,
  Profile,
  ProfileListItem,
  ProfileListParams,
  ProfileListResponse,
  ProfilePingResponse,
  UpdateProfileRequest,
} from '@/types/wiki.types';

// 위키 API 함수들

/**
 * 프로필 생성 (POST /profiles)
 */
export const createProfile = async (data: CreateProfileRequest): Promise<Profile> => {
  const response = await instance.post('/profiles', data);
  return response.data;
};

/**
 * 프로필 목록 조회 (GET /profiles)
 */
export const getProfiles = async (params: ProfileListParams): Promise<ProfileListResponse> => {
  const response = await instance.get('/profiles', { params });
  return response.data;
};

/**
 * 프로필 상세 조회 (GET /profiles/{code})
 */
export const getProfile = async (code: string): Promise<Profile> => {
  const response = await instance.get(`/profiles/${code}`);
  return response.data;
};
/**
 * 프로필 수정 (PATCH /profiles/{code})
 */
export const updateProfile = async (code: string, data: UpdateProfileRequest): Promise<Profile> => {
  const response = await instance.patch(`/profiles/${code}`, data);
  return response.data;
};

/**
 * 프로필 수정 중 체크 (GET /profiles/{code}/ping)
 * - 5분 이내 프로필 수정 여부 상태 확인 (registeredAt, userId)
 */
export const getProfilePing = async (code: string): Promise<ProfilePingResponse> => {
  const response = await instance.get(`/profiles/${code}/ping`);
  return response.data;
};

/**
 * 프로필 수정 중 갱신 (POST /profiles/{code}/ping)
 * - 퀴즈 정답 시 최초 1회 호출해 수정 권한 획득
 * - 이후 프로필 수정 중일 때 주기적으로 호출해 5분 동안 수정 중 상태 유지
 * - 5분 이내 갱신하지 않으면 프로필 수정 불가
 */
export const ping = async (code: string, securityAnswer: string): Promise<ProfilePingResponse> => {
  const response = await instance.post(`/profiles/${code}/ping`, { securityAnswer });
  return response.data;
};
