import Button from "@/components/ui/Button";
import { useState } from "react";
import Searchbar from "@/components/ui/SearchBar";
export default function BoardsPage() {
const [articles, setArticles] = useState([
    {
      updatedAt: "2026-02-05",
      createdAt: "2026-02-05",
      likeCount: 12,
      writer: { name: "김코딩", id: 1 },
      image: "https://picsum.photos/id/1015/600/400",
      title: "React 상태 관리 정리",
      id: 1,
    },
    {
      updatedAt: "2026-02-04",
      createdAt: "2026-02-04",
      likeCount: 5,
      writer: { name: "박프론트", id: 2 },
      image: "https://picsum.photos/id/1025/600/400",
      title: "Next.js App Router 사용법",
      id: 2,
    },
    {
      updatedAt: "2026-02-03",
      createdAt: "2026-02-03",
      likeCount: 27,
      writer: { name: "이디자인", id: 3 },
      image: "https://picsum.photos/id/1035/600/400",
      title: "Tailwind로 카드 UI 만들기",
      id: 3,
    },
    {
  updatedAt: "2026-02-04",
  createdAt: "2026-02-04",
  likeCount: 8,
  writer: {
    name: "홍길동",
    id: 4,
  },
  image: "https://picsum.photos/id/1025/600/400",
  title: "네 번째 게시글입니다.",
  id: 4,
},
  ]);
  return (
    <div className="flex flex-col justify-center">
      <div className=" flex justify-between">
      <h1>베스트 게시글</h1>
      <Button variant="primary" size="md">게시물 등록하기</Button>
      </div>
      <div className="flex gap-4">
      {articles&&articles.map((article)=>(
        <div key={article.id} className="border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[10px] ">
          <img src={article.image} className="w-62.5 h-32"/>
          <div>
            <div className="text-[rgb(71_77_102)] font-semibold text-[18px] leading-[26px]">{article.title}</div>
            <div className="flex text-[rgb(143_149_178)] text-[14px] font-normal leading-[24px]">
              <div>{article.writer.name}</div>
               <div>{article.createdAt}</div>
              
                <div>{article.likeCount}</div>
            </div>
          </div>
       </div>
      ))}
    </div>
    <div>
      <Searchbar placeholder="검샏" id="1" value="w"/>
          </div>
    </div>
  );
}
