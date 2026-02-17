'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';
import type {
  SnackbarItem as SnackbarItemType,
  SnackbarSize,
  SnackbarType,
} from '@/stores/snackbar.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import InfoIcon from '@/assets/icons/ic_info.svg';
import SuccessIcon from '@/assets/icons/ic_success.svg';
import ErrorIcon from '@/assets/icons/ic_error.svg';

const typeConfig: Record<
  SnackbarType,
  {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
    width: string;
    smallWidth: string;
  }
> = {
  info: {
    Icon: InfoIcon,
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    text: 'text-gray-500',
    iconColor: '#8F95B2',
    width: 'w-[860px] max-w-[calc(100vw-32px)]',
    smallWidth: 'w-max min-w-[230px] max-w-[335px]',
  },
  success: {
    Icon: SuccessIcon,
    bg: 'bg-[#E0F2EF]',
    border: 'border-[#4CBFA4]',
    text: 'text-[#4CBFA4]',
    iconColor: '#4CBFA4',
    width: 'w-[247px]',
    smallWidth: 'w-max min-w-[230px]',
  },
  error: {
    Icon: ErrorIcon,
    bg: 'bg-[#FBEDED]',
    border: 'border-[#D14343]',
    text: 'text-[#D14343]',
    iconColor: '#D14343',
    width: 'w-[384px]',
    smallWidth: 'w-max',
  },
};

const sizeConfig: Record<SnackbarSize, { item: string; iconBox: string; iconClass: string }> = {
  default: {
    item: 'h-[50px] min-h-[50px] pl-6 pr-5 py-[15px] gap-3',
    iconBox: 'min-w-[24px] min-h-[24px] w-6 h-6',
    iconClass: 'w-5 h-5',
  },
  small: {
    item: 'h-[42px] min-h-[42px] pl-4 pr-[15px] py-3 gap-2.5',
    iconBox: 'min-w-[20px] min-h-[20px] w-5 h-5',
    iconClass: 'w-[18px] h-[18px]',
  },
};

function SnackbarItem({ snackbar }: { snackbar: SnackbarItemType }) {
  const config = typeConfig[snackbar.type];
  const size = sizeConfig[snackbar.size];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'flex items-center rounded-[10px] border-2 shadow-sm pointer-events-auto font-semibold text-xs leading-5 box-border',
        config.bg,
        config.border,
        size.item,
        snackbar.size === 'small' ? config.smallWidth : config.width
      )}
    >
      <span
        className={cn('flex shrink-0 items-center justify-center box-border', size.iconBox)}
        style={{ color: config.iconColor }}
      >
        <Icon className={cn(size.iconClass, 'shrink-0 block')} style={{ overflow: 'visible' }} />
      </span>
      <span className={cn('whitespace-nowrap min-w-0', config.text)}>{snackbar.message}</span>
    </div>
  );
}

/**
 * 스낵바 목록을 body에 포털로 렌더링하는 컨테이너.
 * _app 또는 레이아웃에 한 번만 넣으면 됨.
 */
export function SnackbarContainer() {
  const snackbars = useSnackbarStore((s) => s.snackbars);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed bottom-6 left-0 right-0 z-[9999] flex flex-col items-center gap-3 pointer-events-none"
      aria-live="polite"
    >
      {snackbars.map((item) => (
        <SnackbarItem key={item.id} snackbar={item} />
      ))}
    </div>,
    document.body
  );
}

/**
 * Zustand 스토어 기반이라 Provider 없이 어디서든 사용 가능.
 */
export function useSnackbar() {
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar);
  return { showSnackbar };
}

export default SnackbarContainer;
