import React, { FC } from "react";

interface EmptyStateProps {
  keyword: string;
  imageSrc?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  keyword,
  imageSrc = "/images/empty-search.png",
}) => {
  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="flex flex-col justify-center items-center text-center
                      w-68.25 h-42.25 
                      md:w-75.75 md:h-52">
        {/* 타이틀: 모바일 2lg, md 이상 xl */}
        <h2 className="text-[18px] md:text-[20px] leading-6.5 font-medium text-gray-400">
          "{keyword}"과(와) 일치하는 검색 결과가 없어요.
        </h2>

        {/* 이미지 */}
        <img
          src={imageSrc}
          alt="검색 결과 없음"
          className="w-27 h-27 mt-8.75
                     md:w-36 md:h-36 object-contain"
        />
      </div>
    </div>
  );
};

export default EmptyState;
