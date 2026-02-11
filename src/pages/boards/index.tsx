import { useState } from 'react';
import Searchbar from '@/components/ui/SearchBar';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Button from '@/components/ui/Button/Button';
import Pagination from '@/components/ui/Pagination/Pagination';
import { LikesIcon } from '@/assets/icons/likesIcon';
export default function BoardsPage() {
  const [articles, setArticles] = useState([
    {
      updatedAt: '2026-02-05',
      createdAt: '2026-02-05',
      likeCount: 12,
      writer: { name: '김코딩', id: 1 },
      image: 'https://picsum.photos/id/1015/600/400',
      title: 'React 상태 관리 정리',
      id: 1,
    },
    {
      updatedAt: '2026-02-04',
      createdAt: '2026-02-04',
      likeCount: 5,
      writer: { name: '박프론트', id: 2 },
      image: 'https://picsum.photos/id/1025/600/400',
      title: 'Next.js App Router 사용법',
      id: 2,
    },
    {
      updatedAt: '2026-02-03',
      createdAt: '2026-02-03',
      likeCount: 27,
      writer: { name: '이디자인', id: 3 },
      image: 'https://picsum.photos/id/1035/600/400',
      title: 'Tailwind로 카드 UI 만들기',
      id: 3,
    },
    {
      updatedAt: '2026-02-04',
      createdAt: '2026-02-04',
      likeCount: 8,
      writer: {
        name: '홍길동',
        id: 4,
      },
      image: 'https://picsum.photos/id/1025/600/400',
      title: '네 번째 게시글입니다.',
      id: 4,
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'likes' },
  ];
  const [option, setOption] = useState<string>('recent');
  return (
    <div className="mt-[60px] w-full px-3 md:max-w-[1200px] md:mx-auto md:px-8">
      <div className=" flex  justify-between">
        <h1 className="text-[32px] font-semibold text-[rgb(71_77_102)]">베스트 게시글</h1>
        <Button variant="primary" size="md">
          게시물 등록하기
        </Button>
      </div>
      <div className="mt-[60px] md:mt-[60px] md:flex md:justify-center">
        <div className="overflow-hidden md:overflow-visible w-full">
          <div className="gap-4 mt-[60px] w-full flex md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {articles &&
              articles.map((article) => (
                <div
                  key={article.id}
                  className=" min-w-[250px]  border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[10px] h-[220px] flex flex-col
               "
                >
                  <img src={article.image} className="w-full h-32 rounded-[10px] " />
                  <div className="flex flex-col  justify-center h-full w-full text-left px-4">
                    <div className="text-[rgb(71_77_102)] font-semibold text-[18px] leading-[26px]">
                      {article.title}
                    </div>

                    <div className="flex items-center justify-between text-[rgb(143_149_178)] text-[14px] font-normal leading-[24px] pt-[6px] gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="shrink-0">{article.writer.name}</div>
                        <div className="shrink-0">{article.createdAt}</div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <LikesIcon />
                        <div>{article.likeCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              onChange={(e) => setSearch(e.target.value)}
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
        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-[10px]  border-b border-[rgb(228_229_240)] bg-white px-4 py-3"
          >
            <div className="text-[16px] font-semibold text-[rgb(71_77_102)]">{article.title}</div>

            <div className="mt-2 flex items-center justify-between text-[14px] text-[rgb(143_149_178)]">
              <div className="flex items-center gap-4">
                <span>{article.writer.name}</span>
                <span>{article.createdAt}</span>
              </div>

              <div className="flex items-center gap-1">
                <LikesIcon />
                <span>{article.likeCount}</span>
              </div>
            </div>
          </div>
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
          {articles &&
            articles.map((article) => (
              <tr className=" h-[49px] text-[16px] font-normal text-[rgb(71_77_102)] border-b border-[rgb(228_229_240)]">
                <td className="text-center">{article.id}</td>
                <td className="text-center">{article.title}</td>
                <td className="text-center">{article.writer.name}</td>
                <td className="text-center">{article.likeCount}</td>
                <td className="text-center">{article.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-[60px] mb-[100px]">
        <Pagination />
      </div>
    </div>
  );
}
