import React from 'react';

interface Props {
  className?: string;
}

const ChevronLeft = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor" // 부모의 text 컬러를 따라가도록 설정
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronLeft;
