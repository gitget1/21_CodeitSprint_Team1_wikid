import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { signUp, type SignUpRequest } from '@/api/auth.api';
import { useAlertStore } from '@/stores/alert.store';

export default function useSignUp() {
  const router = useRouter();
  const showAlert = useAlertStore((state) => state.showAlert);

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: () => {
      showAlert('회원가입이 완료되었습니다.', () => {
        router.push('/login');
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      showAlert(message);
    },
  });
}
