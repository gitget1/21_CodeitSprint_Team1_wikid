import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { authApi, SignInRequest } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth.store';

export default function useSignIn() {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);

  return useMutation({
    mutationFn: (data: SignInRequest) => authApi.signIn(data),
    onSuccess: (response) => {
      setLogin(response.data);
      router.push('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      alert(message);
    },
  });
}
