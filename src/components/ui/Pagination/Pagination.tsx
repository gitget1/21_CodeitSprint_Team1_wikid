import React from 'react';
import ChevronLeft from '@/assets/icons/ChevronLeft.svg';
import ChevronRight from '@/assets/icons/ChevronRight.svg';

type Props = {
  currentPage: number;
  totalCount: number;    // 📌 부모(WikilistPage)로부터 전체 개수를 받음
  pageSize: number;      // 📌 한 페이지에 몇 개씩 보여주는지 받음 (위물은 3, 게시판은 10 등)
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }: Props) => {
  // 📌 1. 실제 필요한 전체 페이지 수 계산 (예: 4개 데이터 / 3개씩 = 2페이지)
  const totalPagesCount = Math.ceil(totalCount / pageSize);

  // 📌 2. 0이거나 1페이지밖에 없을 경우를 대비해 최소 1페이지는 배열에 넣어줌
  const finalTotalPages = totalPagesCount > 0 ? totalPagesCount : 1;

  // 📌 3. 계산된 페이지 수만큼만 숫자 배열 생성 (예: [1, 2])
  const pages = Array.from({ length: finalTotalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2.5">
      {/* 이전 버튼 */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-[10px] bg-white border border-[#DDDDE3] 
                   w-10 h-10 md:w-[45px] md:h-[45px] transition-all 
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#8F95B2]
                   ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        <ChevronLeft className="w-[18px] h-[18px] md:w-6 md:h-6" />
      </button>

      {/* 📌 동적으로 계산된 페이지 번호들만 출력 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center rounded-[10px] font-semibold transition-all
                     w-10 h-10 md:w-[45px] md:h-[45px] text-sm md:text-xl
                     shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                     ${
                       page === currentPage
                         ? 'bg-white border-[2px] border-[#3ABF91] text-[#3ABF91]'
                         : 'bg-white border border-[#DDDDE3] text-[#8F95B2] hover:bg-[#F7F7FA]'
                     }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => currentPage < pages.length && onPageChange(currentPage + 1)}
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