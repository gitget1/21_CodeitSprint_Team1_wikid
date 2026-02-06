import React from 'react';
import emptyIcon from '@/assets/images/empty-search.png';

interface Props {
  className?: string;
}

const EmptyBox = ({ className }: Props) => {
  return (
    <div className={className}>
      <img 
        src={emptyIcon.src}
        alt="검색 결과 없음" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default EmptyBox;