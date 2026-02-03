'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MyPage() {
  // TODO: 비밀번호 변경 로직
  // TODO: 위키 퀴즈 생성 로직

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-8 text-2xl font-bold">계정 설정</h1>

      {/* 비밀번호 변경 */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">비밀번호 변경</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              기존 비밀번호
            </label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="기존 비밀번호를 입력해 주세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              새 비밀번호
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력해 주세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              새 비밀번호 확인
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="새 비밀번호를 다시 입력해 주세요"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">변경하기</Button>
          </div>
        </form>
      </section>

      {/* 위키 퀴즈 생성 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">위키 생성하기</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          다른 사람이 내 위키를 수정하려면 퀴즈를 맞춰야 합니다.
        </p>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              질문
            </label>
            <Input
              id="question"
              placeholder="예: 내가 좋아하는 음식은?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              답
            </label>
            <Input id="answer" placeholder="정답을 입력해 주세요" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">생성하기</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
