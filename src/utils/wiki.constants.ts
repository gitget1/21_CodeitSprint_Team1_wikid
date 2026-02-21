import type { Profile } from '@/types/wiki.types';

/** 편집 세션 타임아웃 (5분) */
export const EDIT_SESSION_TIMEOUT_MS = 5 * 60 * 1000;

/** 프로필 필드 라벨 (편집/보기 공통) */
export const PROFILE_LABELS: { key: keyof Profile; label: string }[] = [
  { key: 'city', label: '거주 도시' },
  { key: 'mbti', label: 'MBTI' },
  { key: 'job', label: '직업' },
  { key: 'sns', label: 'SNS 계정' },
  { key: 'birthday', label: '생일' },
  { key: 'nickname', label: '별명' },
  { key: 'bloodType', label: '혈액형' },
  { key: 'nationality', label: '국적' },
];

/** 프로필 미리보기(접었을 때)에 표시할 필드 */
export const PROFILE_PREVIEW_KEYS: (keyof Profile)[] = ['city', 'mbti', 'job'];
