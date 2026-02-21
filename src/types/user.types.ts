/** 내 정보 조회 응답의 프로필 요약 */
export interface UserMeProfile {
  id: number;
  code: string;
}

/** 내 정보 조회 응답 (GET /users/me) */
export interface UserMeResponse {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: UserMeProfile;
}

/** 비밀번호 변경 요청 body (PATCH /users/me/password) */
export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
