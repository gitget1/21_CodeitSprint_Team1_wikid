/** 프로필 생성 요청 body (POST /profiles) */
export interface CreateProfileRequest {
  securityQuestion: string;
  securityAnswer: string;
}

/** 위키 프로필 한 건 (상세 응답) */
export interface Profile {
  id: number;
  code: string;
  name: string;
  teamId: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  nationality: string;
  content: string;
  family: string;
  securityQuestion: string;
  updatedAt: string;
}

/** 프로필 목록 한 건 (목록 API에서 반환하는 필드만) */
export interface ProfileListItem {
  id: number;
  code: string;
  name: string;
  image: string;
  city: string;
  job: string;
  nationality: string;
  updatedAt: string;
}

/** 프로필 목록 조회 쿼리 파라미터 */
export interface ProfileListParams {
  page: number;
  pageSize: number;
  name: string;
}

/** 프로필 목록 API 응답 */
export interface ProfileListResponse {
  totalCount: number;
  list: ProfileListItem[];
}

/** 프로필 수정 시 보내는 body (보낼 필드만 선택) */
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
  image?: string;
  content?: string;
}

/** 프로필 수정 중 체크/갱신 응답 (GET·POST /profiles/[code]/ping) */
export interface ProfilePingResponse {
  registeredAt: string;
  userId: number;
}
