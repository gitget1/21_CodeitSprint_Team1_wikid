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
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { SuccessIcon } from '@/assets/icons/SuccessIcon';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';

const typeConfig: Record<
  SnackbarType,
  {
    Icon: typeof InfoIcon;
    bg: string;
    border: string;
    text: string;
    width: string;
    smallWidth: string;
  }
> = {
  info: {
    Icon: InfoIcon,
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    text: 'text-gray-500',
    width: 'w-[860px] max-w-[calc(100vw-32px)]',
    smallWidth: 'w-max min-w-[230px] max-w-[335px]',
  },
  success: {
    Icon: SuccessIcon,
    bg: 'bg-primary-green-100',
    border: 'border-primary-green-200',
    text: 'text-primary-green-200',
    width: 'w-[247px]',
    smallWidth: 'w-max min-w-[230px]',
  },
  error: {
    Icon: ErrorIcon,
    bg: 'bg-secondary-red-100',
    border: 'border-secondary-red-200',
    text: 'text-secondary-red-200',
    width: 'w-[384px] ',
    smallWidth: 'w-max',
  },
};

const sizeConfig: Record<SnackbarSize, { item: string; iconClass: string }> = {
  default: {
    item: 'h-[50px] min-h-[50px] px-5 py-[15px] gap-2.5',
    iconClass: 'w-5 h-5',
  },
  small: {
    item: 'h-[42px] min-h-[42px] px-[15px] py-3 gap-2.5',
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
        'flex items-center rounded-[10px] border shadow-sm pointer-events-auto font-semibold text-xs leading-5',
        config.bg,
        config.border,
        size.item,
        snackbar.size === 'small' ? config.smallWidth : config.width
      )}
    >
      <Icon className={cn(size.iconClass, config.text)} />
      <span className={cn('whitespace-nowrap', config.text)}>{snackbar.message}</span>
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
