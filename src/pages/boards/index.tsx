import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Searchbar from '@/components/ui/SearchBar';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Button from '@/components/ui/Button/Button';
import Pagination from '@/components/ui/Pagination/Pagination';
import useArticles from '@/hooks/useBoard';
import { useArticlesStore } from '@/stores/boards.store';
import ArticleBestCard from '@/components/ui/Board/ArticleBestCard';
import ArticleMobileItem from '@/components/ui/Board/ArticleMobileItem';
import ArticleTableRow from '@/components/ui/Board/ArticleTableRow';
import { useAuthStore } from '@/stores/auth.store';

export default function BoardsPage() {
  const { fetchArticles } = useArticles();
  const { isLoggedIn } = useAuthStore();
  const { articles, isLoading, error } = useArticlesStore();
  const [search, setSearch] = useState<string>('');
  const [q, setQ] = useState<string>('');
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'likes' },
  ];
  const [option, setOption] = useState<string>('recent');
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const PAGE_SIZE = 10;
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(t);
  }, [search]);
  if (isLoading) return <div>로딩...</div>;
  if (error) return <div>{error}</div>;

  const list = (articles?.list ?? [])
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.writer.name.toLowerCase().includes(q.toLowerCase())
    )
    .sort((a, b) =>
      option === 'likes'
        ? b.likeCount - a.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const pagedList = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleCreate = async () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용할 수 있어요.');
      router.push('/login');
      return;
    }
    router.push('/boards/createboard');
  };
  return (
    <div className="mt-[60px] w-full px-3 md:max-w-[1200px] md:mx-auto md:px-8">
      <div className=" flex  justify-between">
        <h1 className="text-[32px] font-semibold text-[rgb(71_77_102)]">베스트 게시글</h1>
        <Button variant="primary" size="md" onClick={handleCreate}>
          게시물 등록하기
        </Button>
      </div>
      <div className="mt-[60px] md:mt-[60px] md:flex md:justify-center">
        <div className="overflow-hidden md:overflow-visible w-full">
          <div className="gap-4 mt-[60px] w-full flex md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {articles &&
              articles?.list
                ?.slice()
                .sort((a, b) => b.likeCount - a.likeCount)
                .slice(0, 4)
                .map((article) => <ArticleBestCard key={article.id} article={article} />)}
          </div>
        </div>
      </div>
      <div className="mt-[60px] flex flex-col md:flex-row w-full gap-3 md:gap-4">
        <div className="flex w-full gap-3">
          <div className="flex-1 min-w-0 w-fit">
            <Searchbar
              placeholder="검색"
              id="board"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-[#4CBFA4] text-white hover:bg-[#3AAA91] active:bg-[#32967F]
      inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-semibold transition-all focus-visible:outline-none
      text-sm w-[80px] h-[45px]   "
          >
            검색
          </button>
        </div>
        <Dropdown
          value={option}
          options={sortOptions}
          onChange={(value) => setOption(value)}
          className="min-w-[120px]"
        />
      </div>

      <div className="mt-[20px] md:hidden">
        {pagedList.map((article) => (
          <ArticleMobileItem key={article.id} article={article} />
        ))}
      </div>

      <table className="hidden md:table mt-[20px] w-full border-collapse">
        <thead>
          <tr className=" h-[49px] border-t border-b border-[rgb(228_229_240)] text-[16px] font-normal text-[rgb(143_149_178)]">
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>좋아요</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {pagedList.map((article) => (
            <ArticleTableRow key={article.id} article={article} />
          ))}
        </tbody>
      </table>
      <div className="mt-[60px] mb-[100px]">
        <Pagination currentPage={page} onPageChange={setPage} totalCount={100} pageSize={10} />
      </div>
    </div>
  );
}
