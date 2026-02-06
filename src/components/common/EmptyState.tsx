import React, { FC } from "react";
import EmptyBox from "@/assets/icons/EmptySearch";

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

        <EmptyBox 
          className="w-27 h-27 mt-[35px] md:w-36 md:h-36 object-contain" 
        />
        
      </div>
    </div>
  );
};

export default EmptyState;