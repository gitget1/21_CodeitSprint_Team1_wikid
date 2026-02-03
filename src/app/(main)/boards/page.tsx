'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BoardsPage() {
  // TODO: 게시글 목록 데이터 패칭

  return (
    <div className="container py-8">
      {/* 베스트 게시글 */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold">베스트 게시글</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {/* TODO: BoardCard 컴포넌트 */}
          <div className="rounded-lg border p-4">베스트 게시글 카드</div>
        </div>
      </section>

      {/* 검색 + 글쓰기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Input placeholder="제목으로 검색" className="w-64" />
          <Button>검색</Button>
        </div>
        <Link href="/addboard">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {/* 게시글 목록 테이블 */}
      <div className="rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">번호</th>
              <th className="p-4 text-left">제목</th>
              <th className="p-4 text-left">작성자</th>
              <th className="p-4 text-left">좋아요</th>
              <th className="p-4 text-left">날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: 게시글 행 */}
            <tr className="border-b">
              <td className="p-4">1</td>
              <td className="p-4">샘플 게시글</td>
              <td className="p-4">작성자</td>
              <td className="p-4">0</td>
              <td className="p-4">2024-01-01</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TODO: 페이지네이션 */}
    </div>
  );
}
