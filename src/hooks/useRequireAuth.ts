import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/auth.store';

export function useRequireAuth() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoaded, isLoggedIn, router]);

  if (!isLoaded || !isLoggedIn) {
    return { isLoading: true };
  }

  return { isLoading: false };
}
