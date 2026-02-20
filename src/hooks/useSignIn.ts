import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { signIn, type SignInRequest } from '@/api/auth.api';
import { getProfile } from '@/api/wiki.api';
import { useAuthStore } from '@/stores/auth.store';
import { useAlertStore } from '@/stores/alert.store';
import { isValidImage } from '@/utils/wiki.utils';

export default function useSignIn() {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const setProfileImageUrl = useAuthStore((state) => state.setProfileImageUrl);
  const showAlert = useAlertStore((state) => state.showAlert);

  return useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),
    onSuccess: (data) => {
      setLogin(data);
      const code = data.user?.profile?.code;
      if (code) {
        getProfile(code)
          .then((profile) => {
            if (isValidImage(profile.image)) setProfileImageUrl(profile.image);
          })
          .catch(() => {});
      }
      router.push('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      showAlert(message);
    },
  });
}
