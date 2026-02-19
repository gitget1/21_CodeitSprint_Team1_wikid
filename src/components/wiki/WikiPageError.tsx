export interface WikiPageErrorProps {
  error: string | null;
  onGoToList: () => void;
}

export function WikiPageError({ error, onGoToList }: WikiPageErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-gray-400">{error ?? '프로필을 찾을 수 없습니다.'}</p>
      <button
        type="button"
        onClick={onGoToList}
        className="rounded-[10px] bg-primary-green-200 px-6 py-2 text-sm font-semibold text-white"
      >
        위키 목록으로
      </button>
    </div>
  );
}
