import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function MyPage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>My Page</h1>
    </div>
  );
}
