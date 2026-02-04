import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 유틸리티
 * - 중복 클래스 자동 제거
 * - 조건부 클래스 지원
 *
 * @example
 * cn('px-4 py-2', 'px-6') // 'px-6 py-2'
 * cn('text-red-500', isActive && 'text-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
