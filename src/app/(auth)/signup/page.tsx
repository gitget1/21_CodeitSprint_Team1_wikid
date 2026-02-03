'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              이름
            </label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력해 주세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="text-sm font-medium">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
            />
          </div>

          <Button type="submit" className="w-full">
            가입하기
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link href="/login" className="text-primary hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
