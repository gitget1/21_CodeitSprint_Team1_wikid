
import { useRouter } from 'next/router';

export default function BoardDetailPage() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-xl font-semibold text-gray-700">게시글 상세</h1>
      <p className="mt-2 text-sm text-gray-500">게시글 ID: {boardId || '(로딩 중)'}</p>
    </div>
  );
}
