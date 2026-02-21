import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button/Button';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center m-auto justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl-semibold text-gray-500">404</h1>
        <p className="text-xl-regular text-gray-400">페이지를 찾을 수 없습니다</p>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => router.back()}
            variant="secondary"
            size="lg"
          >
            이전 페이지
          </Button>
          <Link href="/">
            <Button size="lg">
              홈으로 이동
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
