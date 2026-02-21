import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '@/api/wiki.api';
import { useDebounce } from '@/hooks/useDebounce'; 
import Searchbar from '@/components/ui/SearchBar';
import WikiCard from '@/components/wiki/WikiCard';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/ui/Pagination/Pagination';
import WikilistPageSkeleton from './WikilistPageSkeleton';

const PAGE_SIZE = 3;

export default function WikilistPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profiles', currentPage, debouncedSearchTerm],
    queryFn: () => getProfiles({
      page: currentPage,
      pageSize: PAGE_SIZE,
      name: debouncedSearchTerm,
    }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  const wikiList = data?.list || [];
  const totalCount = data?.totalCount || 0;

  // 기존 로딩 처리를 스켈레톤으로 교체
  if (isLoading) return <WikilistPageSkeleton />;

  if (isError) return <div className='min-h-screen flex items-center justify-center text-red-400'>데이터를 불러오는 중 에러가 발생했습니다.</div>

  return (
    <section className="min-h-screen bg-white pb-20 w-full">
      <div className="lg:max-w-[860px] md:max-w-[704px] max-w-[335px] lg:mt-20 md:mt-15 mt-10 mx-auto">
        <Searchbar 
          id="wiki-search"
          placeholder="검색어를 입력하세요"
          value={searchTerm} 
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
        />

        {/* 검색 결과 메시지 (결과가 있을 때만) */}
        <div className={searchTerm && wikiList.length > 0 
          ? "lg:mb-[57px] md:mb-[100px] mb-10" 
          : "lg:mt-[97px] md:mt-[140px] mt-[69px]" 
        }>
          {searchTerm && wikiList.length > 0 && (
            <p className="text-[#8F95B2] lg:mt-[16px] md:mt-[20px] mt-[15px] lg:text-[16px] md:text-[16px] text-[14px] px-3.75 font-normal">
              "{searchTerm}"님을 총 <span className="font-normal text-primary-green-200">{totalCount}명</span> 찾았습니다.
            </p>
          )}
        </div>

        {/* 핵심 렌더링 로직 분기 */}
        {wikiList.length > 0 ? (
          <>
            <div className="flex flex-col lg:gap-6 md:gap-6 gap-2 lg:mb-[100px] md:mb-[80px] mb-[50px]">
              {wikiList.map((profile) => (
                <WikiCard 
                  key={profile.id} 
                  name={profile.name}
                  location={profile.city}
                  job={profile.job}
                  profileImage={profile.image}
                  wikiUrl={`/wiki/${profile.code}`} 
                />
              ))}
            </div>

            <Pagination 
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={3}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="mt-[177px] md:mt-[298px] lg:mt-[204px]">
            {/* 검색어가 있을 때만 EmptyState를 보여줍니다. */}
            {searchTerm && <EmptyState keyword={searchTerm} />}
            {/* 검색어가 없는데 리스트가 비어있다면(데이터 없는 페이지 등) 아무것도 렌더링하지 않음 */}
          </div>
        )}
      </div>
    </section>
  );
}