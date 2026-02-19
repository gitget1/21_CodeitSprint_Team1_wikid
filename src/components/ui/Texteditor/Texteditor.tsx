import { useState } from 'react';

import BoldIcon from '@/assets/icons/ic_bold.svg';
import AlignIcon from '@/assets/icons/ic_align.svg';
import BulletIcon from '@/assets/icons/ic_bullet.svg';
import ImageIcon from '@/assets/icons/ic_image.svg';
import ItalicIcon from '@/assets/icons/ic_italic.svg';
import NumberIcon from '@/assets/icons/ic_number.svg';
import UnderlineIcon from '@/assets/icons/ic_underline.svg';
import LinkIcon from '@/assets/icons/ic_link.svg';
import { uploadImage } from '@/api/image.api';

import Button from '../Button/Button';
import { ImageInsertModal } from '../Modal/Modal';

export interface PostComposerProps {
  /** 값 (controlled) */
  title: string;
  content: string;
  image: string;
  /** 변경 이벤트 */
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onImageChange: (value: string) => void;

  /** 버튼 이벤트 */
  onSubmitClick?: () => void;
  onCancelClick?: () => void;

  /** UI 옵션 */
  heading?: string;
  dateText?: string;
  submitLabel?: string;

  /** 상태 */
  loading?: boolean;
  disabled?: boolean;

  /** 제한 */
  maxTitleLength?: number;
}

function TextEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmitClick,
  onImageChange,
  onCancelClick,
  heading = '게시물 등록하기',
  dateText,
  submitLabel = '등록하기',
  loading = false,
  disabled = false,
  maxTitleLength = 30,
}: PostComposerProps) {
  const titleCount = title.length;
  const titleOver = titleCount > maxTitleLength;
  const titleLength = content.length;
  const titleLengthNoSpace = content.replace(/\s/g, '').length;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [InputImage, setInputImage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const isEmpty = !title.trim() || !content.trim();
  const inputDisabled = disabled || loading;
  const submitDisabled = disabled || loading || isEmpty || titleOver;

  const handleInsertImage = async (file: File | null) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const safeName = `board_${Date.now()}.${ext}`;

      const safeFile = new File([file], safeName, { type: file.type });

      const res = await uploadImage(safeFile);

      setInputImage(res.url);
      setPreviewImage(res.url);
      onImageChange(res.url);
    } catch (e) {
      const message = e instanceof Error ? e.message : '이미지 업로드 실패';
      alert(message);
    } finally {
      URL.revokeObjectURL(preview);
    }
  };
  return (
    <div
      className="w-full rounded-2xl pt-[46px] px-[30px] flex flex-col justify-between min-h-screen bg-white
       md:shadow-[0_4px_12px_rgba(0,0,0,0.08)] md:ring-1 md:ring-black/5"
    >
      <div>
        <div>
          <div className="flex justify-between">
            <div>
              <h2
                className="font-semibold text-2xl text-[rgb(71_77_102)]
"
              >
                {heading}
              </h2>
            </div>

            <Button
              onClick={onSubmitClick ?? onCancelClick}
              disabled={submitDisabled || (!onCancelClick && titleOver)}
            >
              등록하기
            </Button>
          </div>
          {dateText && (
            <p className=" font-normal text-base text-[rgb(143_149_178)] pt-[24px] flex gap-3">
              등록일 {dateText}
            </p>
          )}
        </div>
        <div className="flex justify-between border-y border-neutral-200 mt-[33px] py-[10px]">
          <div className="w-full">
            <input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              disabled={inputDisabled}
              placeholder="제목을 입력해 주세요"
              className="font-medium text-[20px]  placeholder:text-[rgb(143_149_178)
           focus:ring-0 focus:outline-none"
            />

            {titleOver && (
              <p className="mt-2 text-xs text-red-600">
                제목은 {maxTitleLength}자 이내로 입력해 주세요.
              </p>
            )}
          </div>
          <span className="">
            {titleCount}/<span className="text-[rgba(50_166_138)]">{maxTitleLength}</span>
          </span>
        </div>

        <div className="mt-[12px]">
          <span className="text-base font-medium text-[rgb(59_65_91)]">
            공백포함 : 총 {titleLength}자 | 공백제외 : 총 {titleLengthNoSpace}자
          </span>
          <div>
            {previewImage && (
              <div className="mt-3">
                <img src={previewImage} alt="preview" className="max-h-48 rounded-lg border" />
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              disabled={inputDisabled}
              placeholder="본문을 입력해 주세요"
              className="font-normal pt-[12px] text-[20px] resize-none placeholder:text-[rgb(143_149_178)]  w-full  focus:ring-0 focus:outline-none "
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between border mb-[16px] px-[8px] border-gray-300 rounded-[21.5px] ">
        <div className="flex gap-2.5">
          <BoldIcon />
          <AlignIcon />
          <BulletIcon />
          <ItalicIcon />
          <NumberIcon />
          <UnderlineIcon />
          <button onClick={() => setIsImageModalOpen(true)}>
            <ImageIcon />
          </button>

          <ImageInsertModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            onInsert={handleInsertImage}
            size="wide"
          />
        </div>

        <LinkIcon />
      </div>
    </div>
  );
}

export default TextEditor;
