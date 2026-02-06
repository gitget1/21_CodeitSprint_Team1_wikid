'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, Camera } from 'lucide-react';

import { cn } from '@/lib/utils';
import { LockIcon } from '@/assets/icons/LockIcon';

// 클라이언트 마운트 체크를 위한 헬퍼 함수들
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

/**
 * 위키드 공통 Modal 컴포넌트 (기본)
 */
export function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className={cn('relative w-full max-w-[395px] rounded-xl bg-white p-6 shadow-xl', className)}
        role="dialog"
        aria-modal="true"
      >
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-1 text-[#8F95B2] hover:bg-[#F7F7FA] hover:text-[#474D66]"
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        {/* 내용 */}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

/**
 * 퀴즈 모달 (위키 수정 권한 획득용)
 */
export interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  onSubmit: (answer: string) => void;
  error?: string;
  isLoading?: boolean;
  /** default: 395×435, small: 335×435 */
  size?: 'default' | 'small';
}

export function QuizModal({
  isOpen,
  onClose,
  question,
  onSubmit,
  error,
  isLoading,
  size = 'default',
}: QuizModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get('answer') as string;
    onSubmit(answer);
  };

  const isSmall = size === 'small';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn(size === 'small' && 'w-[335px] min-h-[435px] rounded-[10px]')}
    >
      <div className={cn('flex flex-col items-center', isSmall ? 'pb-8 pt-4' : 'pt-4')}>
        {/* 자물쇠 아이콘 */}
        <div className={cn('flex items-center justify-center', isSmall ? 'mb-4' : 'mb-3')}>
          <LockIcon className="h-6 w-6 text-[#8F95B2]" />
        </div>

        {/* 안내 텍스트 */}
        <p
          className={cn(
            'text-center text-sm leading-relaxed text-[#8F95B2]',
            isSmall ? 'mb-8' : 'mb-6'
          )}
        >
          다음 퀴즈를 맞추고
          <br />
          위키를 작성해 보세요.
        </p>

        {/* 질문 */}
        <h3 className="mb-3 w-full text-left text-base font-semibold text-[#474D66]">{question}</h3>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
          <input
            name="answer"
            type="text"
            placeholder="답안을 입력해 주세요"
            className={cn(
              'w-full rounded-[10px] border bg-[#F7F7FA] px-4 text-sm outline-none transition-colors placeholder:text-[#8F95B2]',
              isSmall ? 'mb-2 h-[40px]' : 'mb-2 h-[45px]',
              error
                ? 'border-[#E46969] bg-[#FFEFEF]'
                : 'border-transparent focus:border-[#4CBFA4] focus:bg-white'
            )}
          />
          {error && (
            <p className={cn('w-full text-sm text-[#E46969]', isSmall ? 'mb-3' : 'mb-2')}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full rounded-[10px] bg-[#4CBFA4] font-semibold text-white transition-colors hover:bg-[#3AAA91] disabled:bg-[#E4E5F0] disabled:text-[#8F95B2]',
              isSmall ? 'mt-5 h-[40px]' : 'mt-2 h-[45px]'
            )}
          >
            {isLoading ? '확인 중...' : '확인'}
          </button>
        </form>

        {/* 하단 안내 */}
        <p
          className={cn(
            'text-center text-xs leading-relaxed text-[#8F95B2]',
            isSmall ? 'mt-8' : 'mt-4'
          )}
        >
          위키드는 지인들과 함께하는 즐거운 공간입니다.
          <br />
          지인에게 상처를 주지 않도록 작성해 주세요.
        </p>
      </div>
    </Modal>
  );
}

/**
 * 확인 모달 (타임아웃, 나가기 확인 등)
 * default: 395×215, small: 335×211
 */
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
  size?: 'default' | 'small';
  onConfirm: () => void;
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  confirmText = '확인',
  confirmVariant = 'primary',
  size = 'default',
  onConfirm,
}: ConfirmModalProps) {
  const isSmall = size === 'small';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn(
        'rounded-[10px] p-5',
        isSmall ? 'w-[335px] min-h-[211px]' : 'w-[395px] min-h-[215px]'
      )}
    >
      <div
        className={cn('flex flex-col pt-9', isSmall ? 'min-h-[171px]' : 'min-h-[175px]')}
        style={{ width: '100%' }}
      >
        <h3
          className={cn('mb-2.5 text-left text-[#474D66]', !isSmall && 'text-base font-semibold')}
          style={
            isSmall
              ? {
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '26px',
                }
              : undefined
          }
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn('mb-6 text-left text-[#8F95B2]', !isSmall && 'text-sm')}
            style={
              isSmall
                ? {
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '24px',
                  }
                : undefined
            }
          >
            {description}
          </p>
        )}

        <div className="mt-auto flex justify-end pb-5">
          <button
            onClick={onConfirm}
            className={cn(
              'rounded-[10px] py-[11px] text-white transition-colors',
              confirmVariant === 'danger'
                ? 'flex h-[40px] w-[116px] items-center justify-center gap-2.5 px-5 bg-[#D14343] hover:bg-[#BC3B3B]'
                : 'h-[40px] py-[11px] px-5 gap-[10px] font-semibold bg-[#4CBFA4] hover:bg-[#3AAA91]'
            )}
            style={
              confirmVariant === 'danger'
                ? {
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    fontSize: '13px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }
                : undefined
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * 이미지 등록 모달 (글작성_이미지 삽입)
 */
export interface ImageInsertModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'narrow' | 'wide';
  onInsert?: (file: File | null) => void;
}

export function ImageInsertModal({
  isOpen,
  onClose,
  size = 'narrow',
  onInsert,
}: ImageInsertModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.type.startsWith('image/')) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleInsert = () => {
    onInsert?.(file);
    setFile(null);
    setPreview(null);
    onClose();
  };

  const handleClose = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={cn(size === 'wide' ? 'max-w-[480px]' : 'max-w-[335px]')}
    >
      <div className="flex flex-col pt-4">
        <h3 className="mb-4 text-center text-base font-semibold text-[#474D66]">이미지</h3>

        {/* 업로드 영역 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mb-6 flex min-h-[200px] w-full flex-col items-center justify-center rounded-[10px] bg-[#F7F7FA] transition-colors hover:bg-[#E4E5F0]"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="미리보기"
              className="max-h-[200px] max-w-full rounded-[10px] object-contain"
            />
          ) : (
            <Camera className="h-9 w-9 text-[#8F95B2]" />
          )}
        </button>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleInsert}
            disabled={!file}
            className="h-[45px] min-w-[120px] rounded-[10px] bg-[#E4E5F0] px-6 font-semibold text-[#474D66] transition-colors hover:bg-[#8F95B2] hover:text-white disabled:opacity-50"
          >
            삽입하기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Modal;
