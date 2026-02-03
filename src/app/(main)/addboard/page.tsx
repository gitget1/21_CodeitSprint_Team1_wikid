'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AddBoardPage() {
  // TODO: 게시글 등록 로직

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="mb-8 text-2xl font-bold">게시물 등록하기</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            제목
          </label>
          <Input id="title" placeholder="제목을 입력해 주세요" />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            내용
          </label>
          <Textarea
            id="content"
            placeholder="내용을 입력해 주세요"
            className="min-h-[300px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">이미지 첨부</label>
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
            <span className="text-sm text-muted-foreground">
              클릭하여 이미지 업로드
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link href="/boards">
            <Button type="button" variant="outline">
              목록으로
            </Button>
          </Link>
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </div>
  );
}
