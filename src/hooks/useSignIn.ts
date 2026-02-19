import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { signIn, type SignInRequest } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { useAlertStore } from '@/stores/alert.store';

export default function useSignIn() {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const showAlert = useAlertStore((state) => state.showAlert);

  return useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),
    onSuccess: (data) => {
      setLogin(data);
      router.push('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      showAlert(message);
    },
  });
}
