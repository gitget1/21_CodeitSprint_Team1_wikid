import { useRouter } from 'next/router';

import { Article } from '@/types/board.types';

interface Props {
  article: Article;
}

export default function ArticleTableRow({ article }: Props) {
  const router = useRouter();
  const moveDetail = () => {
    router.push(`/boards/${article.id}`);
  };
  return (
    <tr
      className="h-[49px] text-[16px] text-[rgb(71_77_102)] border-b border-[rgb(228_229_240)]"
      onClick={moveDetail}
    >
      <td className="text-center">{article.id}</td>
      <td className="text-center  hover:text-blue-500">{article.title}</td>
      <td className="text-center">{article.writer.name}</td>
      <td className="text-center">{article.likeCount}</td>
      <td className="text-center">{article.createdAt.slice(0, 10)}</td>
    </tr>
  );
}
