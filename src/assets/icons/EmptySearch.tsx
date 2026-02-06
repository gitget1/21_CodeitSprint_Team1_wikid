import React from 'react';
import Image from 'next/image';

import emptyIcon from '@/assets/images/empty-search.png';

interface Props {
  className?: string;
}

const EmptyBox = ({ className }: Props) => {
  return (
    <div className={className}>
      <Image src={emptyIcon} alt="검색 결과 없음" className="w-full h-full object-contain" />
    </div>
  );
};

export default EmptyBox;
