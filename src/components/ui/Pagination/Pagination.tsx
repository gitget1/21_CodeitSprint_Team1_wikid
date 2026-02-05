import React, { useState } from 'react';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-[4px] md:gap-[10px]">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-[10px] bg-white border border-[#DDDDE3] 
                   w-[40px] h-[40px] md:w-[45px] md:h-[45px] transition-all 
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                   ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
             className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]">
          <path d="M15 18L9 12L15 6" stroke="#8F95B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 그림자 적용 및 활성/비활성 스타일 분리 */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex items-center justify-center rounded-[10px] font-semibold transition-all
                       w-[40px] h-[40px] md:w-[45px] md:h-[45px] text-[14px] md:text-[20px]
                       shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                       ${isActive 
                         ? 'bg-white border-[2px] border-[#3ABF91] text-[#3ABF91]' 
                         : 'bg-white border border-[#DDDDE3] text-[#8F95B2] hover:bg-[#F7F7FA]'
                       }`}
          >
            {page}
          </button>
        );
      })}

      <button 
        onClick={handleNext}
        disabled={currentPage === pages.length}
        className={`flex items-center justify-center rounded-[10px] bg-white border border-[#DDDDE3] 
                   w-[40px] h-[40px] md:w-[45px] md:h-[45px] transition-all
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                   ${currentPage === pages.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]">
          <path d="M9 18L15 12L9 6" stroke="#8F95B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;