/**
 * 텍스트를 클립보드에 복사
 * @example
 * const success = await copyToClipboard('https://wikied.com/wiki/abc123');
 * if (success) alert('복사 완료!');
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 최신 Clipboard API 사용 (HTTPS 필요)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 폴백: execCommand 사용 (구형 브라우저)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
}

/**
 * 위키 참여 링크 생성 및 복사
 * @example
 * await copyWikiLink('abc123'); // https://wikied.com/wiki/abc123 복사
 */
export async function copyWikiLink(code: string): Promise<boolean> {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const wikiUrl = `${baseUrl}/wiki/${code}`;
  return copyToClipboard(wikiUrl);
}
