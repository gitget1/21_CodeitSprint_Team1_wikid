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
      const serverMessage = error.response?.data?.message || '';
      const statusCode = error.response?.status;
      
      // 임시 조치: 500 에러 + Internal Server Error 메시지
      if (statusCode === 500 && serverMessage.toLowerCase().includes('internal server error')) {
        showAlert('이미 존재하는 이름일 수 있습니다.\n 다른 이름으로 시도해주세요.');
      } else {
        const message = serverMessage || '회원가입에 실패했습니다.';
        showAlert(message);
      }
    },
  });
}
