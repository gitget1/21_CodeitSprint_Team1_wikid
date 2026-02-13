import { Article } from '@/types/board.types';

interface Props {
  article: Article;
}

export default function ArticleTableRow({ article }: Props) {
  return (
    <tr className="h-[49px] text-[16px] text-[rgb(71_77_102)] border-b border-[rgb(228_229_240)]">
      <td className="text-center">{article.id}</td>
      <td className="text-center">{article.title}</td>
      <td className="text-center">{article.writer.name}</td>
      <td className="text-center">{article.likeCount}</td>
      <td className="text-center">{article.createdAt.slice(0, 10)}</td>
    </tr>
  );
}
