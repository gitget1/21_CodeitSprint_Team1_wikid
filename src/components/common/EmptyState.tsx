import type { FC } from 'react';
import Image from 'next/image';
import emptyIcon from '@/assets/images/empty-search.png';

interface EmptyStateProps {
  keyword: string;
}

const EmptyState: FC<EmptyStateProps> = ({ keyword }) => {
  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="flex flex-col justify-center items-center text-center 
                      w-[273px] h-[169px]
                      md:w-[303px] md:h-52">
        
        <h2 className="text-[18px] md:text-5 leading-[26px] font-medium text-gray-400">
          <span className="text-gray-600">"{keyword}"</span>과(와) 일치하는 검색 결과가 없어요.
        </h2>

        {/* 별도 컴포넌트 대신 바로 Image 사용 */}
        <div className="relative w-27 h-27 mt-[35px] md:w-36 md:h-36">
          <Image 
            src={emptyIcon} 
            alt="검색 결과 없음" 
            fill // 부모 div 크기에 맞춤
            style={{ objectFit: 'contain' }}
            priority // 검색 결과 없음은 사용자에게 바로 보여야 하므로 우선순위 부여 가능
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;