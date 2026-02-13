import type { ImageUploadResponse } from '@/types/image.types';

import instance from './axios';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * 이미지 업로드 (POST /images)
 * - 최대 5MB
 * - 반환된 url을 프로젝트 내에서 사용
 */
export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('이미지 용량은 5MB 이하여야 합니다.');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await instance.post<ImageUploadResponse>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
