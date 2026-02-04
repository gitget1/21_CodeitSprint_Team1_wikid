import instance from './axios';

// 타입 정의
export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: number;
    code: string;
  } | null;
}

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

// 인증 API 함수들
export const authApi = {
  /**
   * 회원가입
   */
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await instance.post('/auth/signUp', data);
    return response.data;
  },

  /**
   * 로그인
   */
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await instance.post('/auth/signIn', data);
    return response.data;
  },

  /**
   * 내 정보 조회
   */
  getMe: async (): Promise<User> => {
    const response = await instance.get('/users/me');
    return response.data;
  },

  /**
   * 비밀번호 변경
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await instance.patch('/users/me/password', data);
  },
};

export default authApi;
