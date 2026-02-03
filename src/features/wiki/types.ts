export interface Profile {
  id: string;
  code: string;
  name: string;
  image?: string;
  city?: string;
  mbti?: string;
  job?: string;
  sns?: string;
  birthday?: string;
  nickname?: string;
  bloodType?: string;
  nationality?: string;
  content?: string;
  securityQuestion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileListResponse {
  list: Profile[];
  totalCount: number;
}

export interface UpdateProfileRequest {
  city?: string;
  mbti?: string;
  job?: string;
  sns?: string;
  birthday?: string;
  nickname?: string;
  bloodType?: string;
  nationality?: string;
  content?: string;
  securityAnswer?: string;
}
