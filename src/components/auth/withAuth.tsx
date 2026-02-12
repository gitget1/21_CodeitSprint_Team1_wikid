import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/auth.store';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
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

    // 로딩 중이거나 로그인하지 않은 경우
    if (!isLoaded || !isLoggedIn) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
