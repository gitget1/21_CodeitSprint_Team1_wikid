'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface BoardDetailPageProps {
  params: Promise<{ boardId: string }>;
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { boardId } = use(params);

  // TODO: 게시글 상세 데이터 패칭
  // TODO: 댓글 목록 패칭

  return (
    <div className="container max-w-3xl py-8">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <Link href="/boards">
          <Button variant="outline">목록으로</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">수정하기</Button>
          <Button variant="destructive">삭제하기</Button>
        </div>
      </div>

      {/* 게시글 본문 */}
      <article className="mb-8 rounded-lg border p-6">
        <h1 className="mb-4 text-2xl font-bold">게시글 제목 (ID: {boardId})</h1>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>작성자</span>
          <span>•</span>
          <span>2024-01-01</span>
          <span>•</span>
          <span>좋아요 0</span>
        </div>
        <div className="prose max-w-none">
          <p>게시글 내용이 여기에 표시됩니다.</p>
        </div>
      </article>

      {/* 댓글 섹션 */}
      <section>
        <h2 className="mb-4 text-lg font-bold">댓글</h2>

        {/* 댓글 입력 */}
        <div className="mb-6 space-y-2">
          <Textarea placeholder="댓글을 입력해 주세요" />
          <div className="flex justify-end">
            <Button>등록</Button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          <div className="flex gap-4 rounded-lg border p-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-medium">댓글 작성자</span>
                <span className="text-sm text-muted-foreground">2024-01-01</span>
              </div>
              <p className="text-sm">댓글 내용입니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
