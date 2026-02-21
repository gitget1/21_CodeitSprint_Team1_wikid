import { useState, useCallback } from 'react';

/**
 * 모달 상태 관리 훅
 * @example
 * const { isOpen, openModal, closeModal } = useModal();
 */
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;
