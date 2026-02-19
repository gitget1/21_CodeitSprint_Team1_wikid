/** 회원가입 요청 (POST /auth/signUp)v */
export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

/** 로그인 요청 (POST /auth/signIn) v*/
export interface SignInRequest {
  email: string;
  password: string;
}
/** 토큰 갱신 요청 (POST /auth/refresh-token) */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** 토큰 갱신 응답 (POST /auth/refresh-token) */
export interface RefreshTokenResponse {
  accessToken: string;
}

/** 비밀번호 변경 요청 */
export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

/** 인증 응답의 프로필 요약 (id, code) v */
export interface AuthProfile {
  id: number;
  code: string;
}

/** 인증된 사용자 v*/
export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: AuthProfile;
}

/** 로그인/회원가입 응답 v*/
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
