import BoldIcon from '@/assets/icons/ic_bold.svg';
import ItalicIcon from '@/assets/icons/ic_italic.svg';
import UnderlineIcon from '@/assets/icons/ic_underline.svg';
import AlignIcon from '@/assets/icons/ic_align.svg';
import BulletIcon from '@/assets/icons/ic_bullet.svg';
import NumberIcon from '@/assets/icons/ic_number.svg';
import ImageIcon from '@/assets/icons/ic_image.svg';
import LinkIcon from '@/assets/icons/ic_link.svg';

const baseBtn =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded border-0 bg-transparent text-[#474D66] hover:bg-gray-100 hover:text-gray-800 cursor-pointer';
const activeBtn =
  'bg-primary-green-100 text-primary-green-300 hover:bg-primary-green-100 hover:text-primary-green-300';
const toolbarGroup = 'flex shrink-0 items-center gap-0.5';

export interface PostEditorToolbarProps {
  onImageClick: () => void;
  onToolbarChange: () => void;
  runEditorCommand: (fn: () => void) => void;
}

export default function PostEditorToolbar({
  onImageClick,
  onToolbarChange,
  runEditorCommand,
}: PostEditorToolbarProps) {
  const isActive = (cmd: string) =>
    typeof document !== 'undefined' && document.queryCommandState?.(cmd);

  const runAndUpdate = (fn: () => void) => {
    runEditorCommand(fn);
    onToolbarChange();
  };

  return (
    <div className="flex items-center justify-between border mb-[16px] px-[8px] border-gray-300 rounded-[21.5px]">
      <div className={`${toolbarGroup} gap-2.5`}>
        <button
          type="button"
          className={`${baseBtn} ${isActive('bold') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('bold'))}
          title="굵게"
        >
          <BoldIcon />
        </button>

        <button
          type="button"
          className={`${baseBtn} ${isActive('italic') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('italic'))}
          title="기울임"
        >
          <ItalicIcon />
        </button>

        <button
          type="button"
          className={`${baseBtn} ${isActive('underline') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('underline'))}
          title="밑줄"
        >
          <UnderlineIcon />
        </button>

        <button
          type="button"
          className={`${baseBtn} ${isActive('insertUnorderedList') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('insertUnorderedList'))}
          title="글머리"
        >
          <BulletIcon />
        </button>

        <button
          type="button"
          className={`${baseBtn} ${isActive('insertOrderedList') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('insertOrderedList'))}
          title="번호 목록"
        >
          <NumberIcon />
        </button>

        <button
          type="button"
          className={`${baseBtn} ${isActive('justifyLeft') ? activeBtn : ''}`}
          onClick={() => runAndUpdate(() => document.execCommand('justifyLeft'))}
          title="왼쪽 정렬"
        >
          <AlignIcon />
        </button>

        <button type="button" className={baseBtn} onClick={onImageClick} title="이미지 삽입">
          <ImageIcon />
        </button>

        <button
          type="button"
          className={baseBtn}
          onClick={() => {
            const url = window.prompt('링크 URL을 입력하세요');
            if (url?.trim())
              runAndUpdate(() => document.execCommand('createLink', false, url.trim()));
          }}
          title="링크 삽입"
        >
          <LinkIcon />
        </button>
      </div>
    </div>
  );
}
