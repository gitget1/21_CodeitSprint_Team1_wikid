import instance from './axios';

// 프로필(위키) 타입 정의
export interface Profile {
  id: number;
  code: string;
  name: string;
  image: string | null;
  city: string | null;
  mbti: string | null;
  job: string | null;
  sns: string | null;
  birthday: string | null;
  nickname: string | null;
  bloodType: string | null;
  nationality: string | null;
  content: string | null;
  securityQuestion: string | null;
  updatedAt: string;
}

export interface ProfileListResponse {
  totalCount: number;
  list: Profile[];
}

export interface ProfileListParams {
  page?: number;
  pageSize?: number;
  name?: string;
}

export interface UpdateProfileRequest {
  securityAnswer?: string;
  securityQuestion?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string | null;
  content?: string;
}

// 위키 API 함수들
export const wikiApi = {
  /**
   * 프로필 목록 조회
   */
  getProfiles: async (params?: ProfileListParams): Promise<ProfileListResponse> => {
    const response = await instance.get('/profiles', { params });
    return response.data;
  },

  /**
   * 프로필 상세 조회
   */
  getProfile: async (code: string): Promise<Profile> => {
    const response = await instance.get(`/profiles/${code}`);
    return response.data;
  },

  /**
   * 프로필 수정
   */
  updateProfile: async (code: string, data: UpdateProfileRequest): Promise<Profile> => {
    const response = await instance.patch(`/profiles/${code}`, data);
    return response.data;
  },

  /**
   * 프로필 수정 권한 획득 (ping)
   * - 퀴즈 정답 시 호출
   * - 5분간 수정 권한 부여
   */
  ping: async (code: string, securityAnswer: string): Promise<{ registeredAt: string }> => {
    const response = await instance.post(`/profiles/${code}/ping`, { securityAnswer });
    return response.data;
  },
};

export default wikiApi;
