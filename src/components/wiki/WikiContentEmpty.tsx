export interface WikiContentEmptyProps {
  onStartEdit: () => void;
}

export function WikiContentEmpty({ onStartEdit }: WikiContentEmptyProps) {
  return (
    <div className="flex min-h-[192px] w-full max-w-full flex-col items-center justify-center gap-[10px] rounded-[10px] border border-gray-200 bg-[#F7F7FA] px-6 py-10 text-center max-[375px]:px-4 max-[375px]:py-8">
      <p className="whitespace-nowrap text-base text-gray-500 max-[375px]:whitespace-normal">
        아직 작성된 내용이 없네요.
      </p>
      <p className="whitespace-nowrap text-base text-gray-500 max-[375px]:whitespace-normal">
        위키에 참여해 보세요!
      </p>
      <button
        type="button"
        onClick={onStartEdit}
        className="shrink-0 whitespace-nowrap rounded-[10px] bg-primary-green-200 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-green-300 max-[375px]:whitespace-normal"
      >
        시작하기
      </button>
    </div>
  );
}
