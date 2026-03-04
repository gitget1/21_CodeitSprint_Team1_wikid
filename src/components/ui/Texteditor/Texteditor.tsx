import { useEffect, useMemo, useRef, useState } from 'react';

import { uploadImage } from '@/api/image.api';

import Button from '../Button/Button';
import { ImageInsertModal } from '../Modal/Modal';

import PostEditorToolbar from './PostEditorToolbar';

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

function stripHtmlToText(html: string) {
  if (typeof document === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent ?? '';
}

function TextEditor({
  title,
  content,
  image,
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
  const editorRef = useRef<HTMLDivElement | null>(null);

  const lastSyncedHtmlRef = useRef<string>('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(image || '');

  const titleCount = title.length;
  const titleOver = titleCount > maxTitleLength;

  const plainText = useMemo(() => stripHtmlToText(content), [content]);
  const contentLength = plainText.length;
  const contentLengthNoSpace = plainText.replace(/\s/g, '').length;

  const isEmpty = !title.trim() || !plainText.trim();
  const inputDisabled = disabled || loading;
  const submitDisabled = disabled || loading || isEmpty || titleOver;

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const isFocused = typeof document !== 'undefined' && document.activeElement === el;

    if (!isFocused && content !== lastSyncedHtmlRef.current) {
      el.innerHTML = content || '';
      lastSyncedHtmlRef.current = content || '';
    }
  }, [content]);

  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML ?? '';
    lastSyncedHtmlRef.current = html;
    onContentChange(html);
  };

  const runEditorCommand = (fn: () => void) => {
    const el = editorRef.current;
    if (!el) return;

    el.focus();
    fn();

    handleEditorInput();
  };

  const onToolbarChange = () => {};

  const insertImageAtCaret = (url: string) => {
    runEditorCommand(() => {
      document.execCommand(
        'insertHTML',
        false,
        `<img src="${url}" alt="" style="max-width:100%;height:auto;" />`
      );
    });
  };

  const handleInsertImage = async (file: File | null) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const safeName = `board_${Date.now()}.${ext}`;
      const safeFile = new File([file], safeName, { type: file.type });

      const res = await uploadImage(safeFile);

      onImageChange(res.url);
      setPreviewImage(res.url);
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
      <div className="flex flex-col flex-1">
        <div>
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold text-2xl text-[rgb(71_77_102)]">{heading}</h2>
            </div>

            <Button
              onClick={onSubmitClick ?? onCancelClick}
              disabled={submitDisabled || (!onCancelClick && titleOver)}
            >
              {submitLabel}
            </Button>
          </div>

          {dateText && (
            <p className="font-normal text-base text-[rgb(143_149_178)] pt-[24px] flex gap-3">
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
              className="font-medium text-[20px] placeholder:text-[rgb(143_149_178)] focus:ring-0 focus:outline-none w-full"
            />

            {titleOver && (
              <p className="mt-2 text-xs text-red-600">
                제목은 {maxTitleLength}자 이내로 입력해 주세요.
              </p>
            )}
          </div>

          <span>
            {titleCount}/<span className="text-[rgba(50_166_138)]">{maxTitleLength}</span>
          </span>
        </div>

        <div className="mt-[12px] flex flex-col flex-1">
          <span className="text-base font-medium text-[rgb(59_65_91)]">
            공백포함 : 총 {contentLength}자 | 공백제외 : 총 {contentLengthNoSpace}자
          </span>

          {previewImage && (
            <div className="mt-3">
              <img src={previewImage} alt="preview" className="max-h-48 rounded-lg border" />
            </div>
          )}

          <div
            ref={editorRef}
            contentEditable={!inputDisabled}
            suppressContentEditableWarning
            onInput={handleEditorInput}
            onBlur={handleEditorInput}
            className="flex-1 font-normal pt-[12px] text-[20px] w-full focus:outline-none min-h-[240px]
                       whitespace-pre-wrap break-words"
            data-placeholder="본문을 입력해 주세요"
          />
        </div>
        <PostEditorToolbar
          onImageClick={() => setIsImageModalOpen(true)}
          runEditorCommand={runEditorCommand}
          onToolbarChange={onToolbarChange}
        />
      </div>

      <ImageInsertModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsert={handleInsertImage}
        size="wide"
      />
    </div>
  );
}

export default TextEditor;
