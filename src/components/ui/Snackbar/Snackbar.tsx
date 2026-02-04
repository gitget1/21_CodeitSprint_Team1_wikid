'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

// Snackbar 타입
type SnackbarType = 'info' | 'success' | 'error';

interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

// 커스텀 아이콘 컴포넌트들
const InfoIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16V12C13 11.7167 12.9042 11.4792 12.7125 11.2875C12.5208 11.0958 12.2833 11 12 11C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12V16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M10.6 13.8L8.45 11.65C8.26667 11.4667 8.03333 11.375 7.75 11.375C7.46667 11.375 7.23333 11.4667 7.05 11.65C6.86667 11.8333 6.775 12.0667 6.775 12.35C6.775 12.6333 6.86667 12.8667 7.05 13.05L9.9 15.9C10.1 16.1 10.3333 16.2 10.6 16.2C10.8667 16.2 11.1 16.1 11.3 15.9L16.95 10.25C17.1333 10.0667 17.225 9.83333 17.225 9.55C17.225 9.26667 17.1333 9.03333 16.95 8.85C16.7667 8.66667 16.5333 8.575 16.25 8.575C15.9667 8.575 15.7333 8.66667 15.55 8.85L10.6 13.8ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
      fill="currentColor"
    />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16C13 15.7167 12.9042 15.4792 12.7125 15.2875C12.5208 15.0958 12.2833 15 12 15C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 13C12.2833 13 12.5208 12.9042 12.7125 12.7125C12.9042 12.5208 13 12.2833 13 12V8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8V12C11 12.2833 11.0958 12.5208 11.2875 12.7125C11.4792 12.9042 11.7167 13 12 13ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
      fill="currentColor"
    />
  </svg>
);

// 스타일 설정
const snackbarStyles: Record<
  SnackbarType,
  {
    bg: string;
    border: string;
    text: string;
    iconColor: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  info: {
    bg: 'bg-[#F7F7FA]',
    border: 'border-[#E4E5F0]',
    text: 'text-[#474D66]',
    iconColor: 'text-[#8F95B2]',
    Icon: InfoIcon,
  },
  success: {
    bg: 'bg-[#EEF9F6]',
    border: 'border-[#4CBFA4]',
    text: 'text-[#4CBFA4]',
    iconColor: 'text-[#4CBFA4]',
    Icon: CheckIcon,
  },
  error: {
    bg: 'bg-[#FFEFEF]',
    border: 'border-[#E46969]',
    text: 'text-[#E46969]',
    iconColor: 'text-[#E46969]',
    Icon: ErrorIcon,
  },
};

/**
 * Snackbar Provider 컴포넌트
 * - _app.tsx에서 감싸서 사용
 */
// 클라이언트 마운트 체크를 위한 헬퍼 함수들
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const showSnackbar = useCallback((message: string, type: SnackbarType = 'info') => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, message, type }]);

    // 3초 후 자동 제거
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== id));
    }, 3000);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {isMounted &&
        createPortal(
          <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
            {snackbars.map((snackbar) => {
              const style = snackbarStyles[snackbar.type];
              const IconComponent = style.Icon;
              return (
                <div
                  key={snackbar.id}
                  className={cn(
                    'flex items-center gap-2.5 rounded-full border px-5 py-2.5 shadow-sm',
                    style.bg,
                    style.border,
                    style.text
                  )}
                >
                  <IconComponent className={cn('h-5 w-5 flex-shrink-0', style.iconColor)} />
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {snackbar.message}
                  </span>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </SnackbarContext.Provider>
  );
}

/**
 * Snackbar 훅
 */
export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
}

export default SnackbarProvider;
