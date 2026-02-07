import instance from './axios';

// Request Types
interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

// Response Types
interface Profile {
    id: number;
    code: string;
  }

interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

// API 함수
export const authApi = {
  signUp: (body: SignUpRequest) => {
    return instance.post<AuthResponse>('/auth/signUp', body);
  },

  signIn: (body: SignInRequest) => {
    return instance.post<AuthResponse>('/auth/signIn', body);
  },

  refreshToken: (refreshToken: string) => {
    return instance.post<RefreshTokenResponse>('/auth/refresh-token', { refreshToken });
  },
};

export type { SignUpRequest, SignInRequest, User, AuthResponse, RefreshTokenResponse };
