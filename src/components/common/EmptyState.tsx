import type { FC } from 'react';

import EmptyBox from '@/assets/icons/EmptySearch';

interface EmptyStateProps {
  keyword: string;
}

const EmptyState: FC<EmptyStateProps> = ({ keyword }) => {
  return (
    <div className="w-full flex justify-center items-center px-4">
      <div
        className="flex flex-col justify-center items-center text-center 
                      w-68.25 h-42.25 
                      md:w-75.75 md:h-52"
      >
        <h2 className="text-[18px] md:text-[20px] leading-6.5 font-medium text-gray-400">
          <span className="text-gray-600">&ldquo;{keyword}&rdquo;</span>과(와) 일치하는 검색 결과가
          없어요.
        </h2>

        <EmptyBox className="w-27 h-27 mt-8.75 md:w-36 md:h-36 object-contain" />
      </div>
    </div>
  );
};

export default EmptyState;
