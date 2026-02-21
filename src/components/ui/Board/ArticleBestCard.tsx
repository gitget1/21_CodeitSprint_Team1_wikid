import Link from 'next/link';

import LikesIcon from '@/assets/icons/ic_heart.svg';
import { Article } from '@/types/board.types';

interface Props {
  article: Article;
}

export default function ArticleBestCard({ article }: Props) {
  return (
    <Link href={`/boards/${article.id}`} className="block">
      <div className="min-w-[250px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[10px] h-[220px] flex flex-col">
        <img
          src={article.image || 'https://placehold.co/600x400?text=No+Image'}
          className="w-full h-[131px] aspect-video object-cover rounded-t-[10px]"
        />

        <div className="flex flex-col justify-center h-full w-full text-left px-4">
          <div className="text-[rgb(71_77_102)] font-semibold text-[18px] leading-[26px] line-clamp-2">
            {article.title}
          </div>

          <div className="flex items-center justify-between text-[rgb(143_149_178)] text-[14px] pt-[6px]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="shrink-0">{article.writer.name}</div>
              <div className="shrink-0">{article.createdAt.slice(0, 10)}</div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <LikesIcon />
              <div>{article.likeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
