'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/common';

export default function WikiListPage() {
  // TODO: 위키 목록 데이터 패칭
  const profiles: never[] = [];

  return (
    <div className="container py-8">
      {/* 검색 */}
      <div className="mb-8 flex gap-2">
        <Input placeholder="이름으로 검색" className="max-w-sm" />
        <Button>검색</Button>
      </div>

      {/* 위키 목록 */}
      {profiles.length === 0 ? (
        <EmptyState
          title="검색 결과가 없습니다"
          description="다른 키워드로 검색해 보세요"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO: WikiCard 컴포넌트 */}
        </div>
      )}

      {/* TODO: 페이지네이션 */}
    </div>
  );
}
