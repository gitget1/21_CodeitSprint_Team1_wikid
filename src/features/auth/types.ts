export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
