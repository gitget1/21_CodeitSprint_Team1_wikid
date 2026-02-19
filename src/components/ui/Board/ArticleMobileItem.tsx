import Link from 'next/link';

import LikesIcon from '@/assets/icons/ic_heart.svg';
import { Article } from '@/types/board.types';

interface Props {
  article: Article;
}

export default function ArticleMobileItem({ article }: Props) {
  return (
    <Link href={`/boards/${article.id}`} className="block">
      <div className="rounded-[10px] border-b border-[rgb(228_229_240)] bg-white px-4 py-3">
        <div className="text-[16px] font-semibold text-[rgb(71_77_102)]">{article.title}</div>

        <div className="mt-2 flex items-center justify-between text-[14px] text-[rgb(143_149_178)]">
          <div className="flex items-center gap-4">
            <span>{article.writer.name}</span>
            <span>{article.createdAt.slice(0, 10)}</span>
          </div>

          <div className="flex items-center gap-1">
            <LikesIcon />
            <span>{article.likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
