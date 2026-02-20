import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/ui/Button/Button';
import TextEditor from '@/components/ui/Texteditor/Texteditor';
import useArticles from '@/hooks/useBoard';

export default function AddBoard() {
  const router = useRouter();
  const { postArticle } = useArticles();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const moveList = () => {
    router.push('/boards');
  };
  const handleSubmit = async () => {
    const created = await postArticle({ title, content, image });
    if (!created) return;

    router.push('/boards');
  };

  const today = new Date();
  const dateText = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}.`;
  return (
    <div className="w-full mx-auto max-w-4xl px-4 py-8">
      <TextEditor
        title={title}
        content={content}
        image={image}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmitClick={handleSubmit}
        onImageChange={setImage}
        dateText={dateText}
      />
      <div className="mt-[13px] flex justify-center">
        <Button variant="secondary" onClick={moveList}>
          목록으로
        </Button>
      </div>
    </div>
  );
}
