/** 이미지 URL 유효 여부 (http/https 기준) */
export function isValidImage(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    return trimmed.startsWith('http://') || trimmed.startsWith('https://');
  } catch {
    return false;
  }
}

/** 프로필 필드 표시용 포맷 (빈 값은 '-'로) */
export function formatProfileValue(value: string | undefined | null): string {
  if (value === undefined || value === null || value.trim() === '') return '-';
  return value.trim();
}
