'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { SuccessIcon } from '@/assets/icons/SuccessIcon';

// Snackbar 타입
type SnackbarType = 'info' | 'success' | 'error';
type SnackbarSize = 'default' | 'small';

interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
  size: SnackbarSize;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType, size?: SnackbarSize) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

// 스타일 설정
const snackbarConfig = {
  info: {
    bg: '#F7F7FA',
    border: '#E4E5F0',
    text: '#474D66',
    Icon: InfoIcon,
  },
  success: {
    bg: '#EEF9F6',
    border: '#4CBFA4',
    text: '#4CBFA4',
    Icon: SuccessIcon,
  },
  error: {
    bg: '#FFEFEF',
    border: '#E46969',
    text: '#E46969',
    Icon: ErrorIcon,
  },
};

// 사이즈별 설정 (large = default)
const sizeConfig = {
  default: {
    height: '50px',
    minHeight: '50px',
    padding: '15px 20px',
    iconSize: 20,
    width: {
      info: '860px',
      success: '247px',
      error: '384px',
    },
    fontFamily: 'Pretendard',
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 600,
  },
  small: {
    height: '42px',
    minHeight: '42px',
    padding: '12px 15px',
    iconSize: 18,
    width: {
      info: '335px',
      success: '230px',
      error: '328px',
    },
    fontFamily: 'Pretendard',
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 600,
  },
};

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 후에만 포털 렌더 (서버/클라이언트 HTML 일치로 hydration 오류 방지)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = 'info', size: SnackbarSize = 'default') => {
      const id = Date.now();
      setSnackbars((prev) => [...prev, { id, message, type, size }]);

      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== id));
      }, 3000);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {mounted &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '0',
              right: '0',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              pointerEvents: 'none',
            }}
          >
            {snackbars.map((snackbar) => {
              const config = snackbarConfig[snackbar.type];
              const sizes = sizeConfig[snackbar.size];
              const IconComponent = config.Icon;
              return (
                <div
                  key={snackbar.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: sizes.height,
                    minHeight: sizes.minHeight,
                    padding: sizes.padding,
                    borderRadius: '10px',
                    border: `1px solid ${config.border}`,
                    backgroundColor: config.bg,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: snackbar.size === 'small' ? 'max-content' : sizes.width[snackbar.type],
                    minWidth: snackbar.size === 'small' ? sizes.width[snackbar.type] : undefined,
                    justifyContent: 'flex-start',
                    pointerEvents: 'auto',
                  }}
                >
                  <div style={{ flexShrink: 0, color: config.text }}>
                    <IconComponent
                      className={sizes.iconSize === 18 ? '!w-[18px] !h-[18px]' : '!w-5 !h-5'}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: sizes.fontFamily,
                      fontSize: sizes.fontSize,
                      lineHeight: sizes.lineHeight,
                      fontWeight: sizes.fontWeight,
                      color: config.text,
                      textAlign: 'left',
                      overflow: 'visible',
                      whiteSpace: 'nowrap',
                      flex: snackbar.size === 'small' ? '0 1 auto' : 1,
                      minWidth: snackbar.size === 'small' ? 'min-content' : 0,
                    }}
                  >
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

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
}

export default SnackbarProvider;
