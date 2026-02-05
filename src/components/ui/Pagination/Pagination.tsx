import React, { useState } from 'react';
import ChevronLeft from '@/assets/icons/ChevronLeft';
import ChevronRight from '@/assets/icons/ChevronRight';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2.5"> 
      
      <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-[10px] bg-white border border-[#DDDDE3] 
                   w-10 h-10 md:w-[45px] md:h-[45px] transition-all 
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#8F95B2]
                   ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        <ChevronLeft className="w-[18px] h-[18px] md:w-6 md:h-6" /> 
      </button>

      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`flex items-center justify-center rounded-[10px] font-semibold transition-all
                     w-10 h-10 md:w-[45px] md:h-[45px] text-sm md:text-xl
                     shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                     ${page === currentPage 
                       ? 'bg-white border-[2px] border-[#3ABF91] text-[#3ABF91]' 
                       : 'bg-white border border-[#DDDDE3] text-[#8F95B2] hover:bg-[#F7F7FA]'
                     }`}
        >
          {page}
        </button>
      ))}

      
      <button 
        onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages.length}
        className={`flex items-center justify-center rounded-[10px] bg-white border border-[#DDDDE3] 
                   w-10 h-10 md:w-[45px] md:h-[45px] transition-all
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#8F95B2]
                   ${currentPage === pages.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        <ChevronRight className="w-[18px] h-[18px] md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default Pagination;