import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { changePassword } from '@/api/user.api';
import type { ChangePasswordRequest } from '@/types/user.types';
import { useAlertStore } from '@/stores/alert.store';

export default function useChangePassword() {
  const router = useRouter();
  const showAlert = useAlertStore((state) => state.showAlert);

  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
    onSuccess: () => {
      showAlert('비밀번호가 변경되었습니다.', () => {
        router.push('/');
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 400) {
        showAlert('비밀번호가 일치하지 않습니다.');
      } else {
        const message = error.response?.data?.message || '비밀번호 변경에 실패했습니다.';
        showAlert(message);
      }
    },
  });
}
