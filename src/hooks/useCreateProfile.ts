import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { createProfile } from '@/api/wiki.api';
import type { CreateProfileRequest } from '@/types/wiki.types';
import { useAuthStore } from '@/stores/auth.store';

export default function useCreateProfile() {
  const router = useRouter();
  const updateProfile = useAuthStore((state) => state.updateProfile);

  return useMutation({
    mutationFn: (data: CreateProfileRequest) => createProfile(data),
    onSuccess: (data) => {
      if (data.code) {
        updateProfile({
          id: data.id,
          code: data.code,
        });
        alert('위키가 생성되었습니다.');
        router.push(`/wiki/${data.code}`);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 400) {
        alert('입력값을 확인해주세요.');
      } else {
        const message = error.response?.data?.message || '위키 생성에 실패했습니다.';
        alert(message);
      }
    },
  });
}
