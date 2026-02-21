import type { ReactNode } from 'react';

import LinkIcon from '@/assets/icons/ic_link.svg';

export interface WikiNameAndLinkProps {
  name: string;
  linkDisplayText: string;
  onCopyLink: () => void;
  /** URL 바 오른쪽에 배치할 액션 (예: 위키 참여하기 버튼) */
  actionSlot?: ReactNode;
}

export function WikiNameAndLink({
  name,
  linkDisplayText,
  onCopyLink,
  actionSlot,
}: WikiNameAndLinkProps) {
  return (
    <div className="flex min-w-0 w-[860px] max-w-full flex-col justify-center gap-3 min-[745px]:h-[112px]">
      <div className="flex min-w-0 items-center gap-3">
        <h1
          className="min-w-0 flex-1 font-semibold text-gray-800 leading-[46px] max-[744px]:truncate max-[744px]:text-2xl max-[744px]:leading-tight min-[745px]:text-[48px]"
          style={{
            fontFamily: 'var(--font-pretendard), Pretendard, sans-serif',
            letterSpacing: '0%',
            fontSize: 'clamp(1.5rem, 5vw, 48px)',
          }}
        >
          {name}
        </h1>
        {actionSlot && <div className="flex shrink-0 items-center">{actionSlot}</div>}
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-[10px]">
        <button
          type="button"
          onClick={onCopyLink}
          className="group flex h-[34px] min-w-0 max-w-full shrink-0 items-center gap-[10px] rounded-[10px] bg-primary-green-100 px-[10px] py-[5px] text-left text-[14px] font-medium leading-none text-primary-green-300 transition-colors hover:bg-primary-green-200 hover:text-white w-full max-w-full"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <LinkIcon
              className="h-5 w-5 text-primary-green-300 transition-colors group-hover:text-white"
              aria-hidden
            />
          </span>
          <span className="min-w-0 truncate">{linkDisplayText}</span>
        </button>
      </div>
    </div>
  );
}
