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
 * - body.image는 백엔드에서 URL 또는 null만 허용하므로, 빈 문자열은 null로 변환
 */
export const updateProfile = async (code: string, data: UpdateProfileRequest): Promise<Profile> => {
  const body = { ...data };
  if ('image' in body && body.image === '') {
    (body as Record<string, unknown>).image = null;
  }
  const response = await instance.patch(`/profiles/${code}`, body);
  return response.data;
};

/**
 * 프로필 수정 중 체크 (GET /profiles/{code}/ping)
 * - 200 + body: 수정 중 (registeredAt, userId)
 * - 204 No Content 또는 body 없음: 수정 중인 사람 없음 → null 반환
 */
export const getProfilePing = async (code: string): Promise<ProfilePingResponse | null> => {
  const response = await instance.get(`/profiles/${code}/ping`);
  if (response.status === 204 || response.data == null) return null;
  const data = response.data as ProfilePingResponse;
  if (data.userId == null && (data as { user_id?: number }).user_id == null) return null;
  return data;
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

/**
 * 프로필 수정 세션 해제 (DELETE /profiles/{code}/ping)
 * - 타임아웃/취소/확인 시 호출해 즉시 '아무도 수정 중이 아님' 상태로 되돌림
 */
export const releaseProfilePing = async (code: string): Promise<void> => {
  await instance.delete(`/profiles/${code}/ping`);
};
