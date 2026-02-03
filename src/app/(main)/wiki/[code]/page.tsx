'use client';

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface WikiPageProps {
  params: Promise<{ code: string }>;
}

export default function WikiPage({ params }: WikiPageProps) {
  const { code } = use(params);

  // TODO: 위키 데이터 패칭
  // TODO: 퀴즈 모달
  // TODO: 5분 타이머

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* 메인 콘텐츠 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">위키 제목</h1>
            <div className="flex gap-2">
              <Button variant="outline">링크</Button>
              <Button>위키 참여하기</Button>
            </div>
          </div>

          {/* 위키 본문 */}
          <div className="prose max-w-none">
            <p>위키 내용이 여기에 표시됩니다. (code: {code})</p>
          </div>
        </div>

        {/* 프로필 섹션 */}
        <aside className="rounded-lg border p-6">
          <div className="mb-6 text-center">
            <Avatar className="mx-auto h-24 w-24">
              <AvatarImage src="" alt="프로필" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">거주 도시</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MBTI</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">직업</span>
              <span>-</span>
            </div>
            {/* TODO: 나머지 인적사항 */}
          </div>
        </aside>
      </div>
    </div>
  );
}
