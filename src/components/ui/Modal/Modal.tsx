'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';

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
}

export function QuizModal({
  isOpen,
  onClose,
  question,
  onSubmit,
  error,
  isLoading,
}: QuizModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get('answer') as string;
    onSubmit(answer);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center pt-4">
        {/* 자물쇠 아이콘 */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7FA]">
          <Lock className="h-6 w-6 text-[#8F95B2]" />
        </div>

        {/* 안내 텍스트 */}
        <p className="mb-6 text-center text-sm text-[#8F95B2]">
          다음 퀴즈를 맞추고
          <br />
          위키를 작성해 보세요.
        </p>

        {/* 질문 */}
        <h3 className="mb-2 text-base font-semibold text-[#474D66]">{question}</h3>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="w-full">
          <input
            name="answer"
            type="text"
            placeholder="답안을 입력해 주세요"
            className={cn(
              'mb-2 h-[45px] w-full rounded-[10px] border bg-[#F7F7FA] px-4 text-sm outline-none transition-colors placeholder:text-[#8F95B2]',
              error
                ? 'border-[#E46969] bg-[#FFEFEF]'
                : 'border-transparent focus:border-[#4CBFA4] focus:bg-white'
            )}
          />
          {error && <p className="mb-2 text-sm text-[#E46969]">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-[45px] w-full rounded-[10px] bg-[#4CBFA4] font-semibold text-white transition-colors hover:bg-[#3AAA91] disabled:bg-[#E4E5F0] disabled:text-[#8F95B2]"
          >
            {isLoading ? '확인 중...' : '확인'}
          </button>
        </form>

        {/* 하단 안내 */}
        <p className="mt-4 text-center text-xs text-[#8F95B2]">
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
 */
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  confirmText = '확인',
  confirmVariant = 'primary',
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[335px]">
      <div className="flex flex-col items-center pt-2">
        <h3 className="mb-2 text-center text-base font-semibold text-[#474D66]">{title}</h3>
        {description && <p className="mb-6 text-center text-sm text-[#8F95B2]">{description}</p>}

        <button
          onClick={onConfirm}
          className={cn(
            'h-[45px] w-full rounded-[10px] font-semibold text-white transition-colors',
            confirmVariant === 'danger'
              ? 'bg-[#E46969] hover:bg-[#D15A5A]'
              : 'bg-[#4CBFA4] hover:bg-[#3AAA91]'
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

export default Modal;
