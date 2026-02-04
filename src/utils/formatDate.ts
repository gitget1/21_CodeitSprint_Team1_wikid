/**
 * 날짜를 'YYYY.MM.DD' 형식으로 변환
 * @example formatDate('2024-01-15T12:00:00Z') // '2024.01.15'
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 날짜를 'YYYY년 MM월 DD일' 형식으로 변환
 * @example formatDateKorean('2024-01-15T12:00:00Z') // '2024년 01월 15일'
 */
export function formatDateKorean(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 상대적 시간 표시 (몇 분 전, 몇 시간 전 등)
 * @example getRelativeTime('2024-01-15T12:00:00Z') // '3시간 전'
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 7일 이상이면 날짜 표시
  return formatDate(dateString);
}
