'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  // TODO: 로그인 상태에 따라 다른 UI 표시
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Wikid</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/wikilist"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            위키 목록
          </Link>
          <Link
            href="/boards"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            자유게시판
          </Link>
        </nav>

        {/* 로그인/프로필 */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* TODO: 알림 아이콘 */}
              {/* TODO: 프로필 드롭다운 */}
              <Button variant="outline" size="sm">
                로그아웃
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
