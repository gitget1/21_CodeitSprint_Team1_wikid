import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { signUp, type SignUpRequest } from '@/api/auth.api';

export default function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      alert(message);
    },
  });
}
