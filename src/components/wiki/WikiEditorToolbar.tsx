import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { RefObject } from 'react';

import BoldIcon from '@/assets/icons/ic_bold.svg';
import ItalicIcon from '@/assets/icons/ic_italic.svg';
import UnderlineIcon from '@/assets/icons/ic_underline.svg';
import AlignIcon from '@/assets/icons/ic_align.svg';
import BulletIcon from '@/assets/icons/ic_bullet.svg';
import NumberIcon from '@/assets/icons/ic_number.svg';
import ImageIcon from '@/assets/icons/ic_image.svg';
import EditorLinkIcon from '@/assets/icons/ic_link.svg';
import VideoIcon from '@/assets/icons/ic_video.svg';
import { ChevronDownIcon } from '@/components/ui/ChevronDownIcon';
import type { Profile } from '@/types/wiki.types';

export interface WikiEditorToolbarProps {
  profile: Profile;
  runEditorCommand: (fn: () => void) => void;
  onToolbarChange: () => void;
  editorImageInputRef: RefObject<HTMLInputElement | null>;
  onEditorVideoInsert: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  sessionTimeLeft?: number;
  formatSessionTime?: () => string;
}

const baseBtn =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded border-0 bg-transparent text-[#474D66] hover:bg-gray-100 hover:text-gray-800';
const activeBtn =
  'bg-primary-green-100 text-primary-green-300 hover:bg-primary-green-100 hover:text-primary-green-300';
const sep = <span className="mx-1 h-5 w-px shrink-0 bg-gray-300" aria-hidden />;
const toolbarGroup = 'flex shrink-0 items-center gap-0.5';

export function WikiEditorToolbar({
  profile,
  runEditorCommand,
  onToolbarChange,
  editorImageInputRef,
  onEditorVideoInsert,
  onSave,
  onCancel,
  sessionTimeLeft,
  formatSessionTime,
}: WikiEditorToolbarProps) {
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);
  const [titleDropdownRect, setTitleDropdownRect] = useState<{ top: number; left: number } | null>(
    null
  );
  const titleDropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (cmd: string) =>
    typeof document !== 'undefined' && document.queryCommandState?.(cmd);
  const runAndUpdate = (fn: () => void) => {
    runEditorCommand(fn);
    onToolbarChange();
  };

  useEffect(() => {
    if (titleDropdownOpen && titleDropdownRef.current) {
      const rect = titleDropdownRef.current.getBoundingClientRect();
      setTitleDropdownRect({ top: rect.bottom + 4, left: rect.left });
    } else {
      setTitleDropdownRect(null);
    }
  }, [titleDropdownOpen]);

  useEffect(() => {
    if (!titleDropdownOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (titleDropdownRef.current?.contains(target)) return;
      if (document.getElementById('title-dropdown-portal')?.contains(target)) return;
      setTitleDropdownOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [titleDropdownOpen]);

  const cancelSaveButtons = (
    <div className="flex shrink-0 items-center gap-2">
      {typeof sessionTimeLeft === 'number' && formatSessionTime && (
        <div
          className="hidden shrink-0 rounded bg-gray-200/80 px-3 py-1.5 text-sm font-medium text-gray-700 min-[745px]:block"
          title="비활성 시 자동 종료"
        >
          남은 시간 {formatSessionTime()}
        </div>
      )}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="h-10 w-[65px] shrink-0 rounded-[10px] border-2 border-[#32a68a] text-sm font-semibold text-[#32a68a] hover:bg-gray-50"
        >
          취소
        </button>
      )}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className="h-10 w-[65px] shrink-0 rounded-[10px] bg-primary-green-200 text-sm font-semibold text-white hover:bg-primary-green-300"
        >
          저장
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* 744px 이하: 이름 + 취소/저장 별도 줄 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 min-[745px]:hidden">
        <span className="text-base font-semibold text-gray-800">{profile.name}</span>
        {cancelSaveButtons}
      </div>

      {/* 툴바 줄 */}
      <div className="flex h-[60px] min-w-0 flex-nowrap items-center overflow-x-auto overflow-y-visible border-b border-gray-200 bg-[#F7F7FA] pl-4 pr-4">
        {/* 745px 이상에서만 이름 표시 */}
        <span className="mr-3 hidden shrink-0 text-base font-semibold text-gray-800 min-[745px]:inline">
          {profile.name}
        </span>
        <span
          className="mx-1 hidden h-5 w-px shrink-0 bg-gray-300 min-[745px]:inline"
          aria-hidden
        />
        <div className={toolbarGroup}>
          <button
            type="button"
            className={`${baseBtn} ${isActive('bold') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('bold'))}
            title="굵게"
          >
            <BoldIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${baseBtn} ${isActive('italic') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('italic'))}
            title="기울임"
          >
            <ItalicIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${baseBtn} ${isActive('underline') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('underline'))}
            title="밑줄"
          >
            <UnderlineIcon className="h-5 w-5" />
          </button>
        </div>
        {sep}
        <div className={toolbarGroup}>
          <div className="relative shrink-0" ref={titleDropdownRef}>
            <button
              type="button"
              className={`${baseBtn} min-w-[4rem] gap-0.5 ${titleDropdownOpen ? activeBtn : ''}`}
              onClick={() => setTitleDropdownOpen((o) => !o)}
              title="제목 / 본문"
              aria-expanded={titleDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-sm font-semibold">제목</span>
              <ChevronDownIcon
                className={`h-4 w-4 shrink-0 ${titleDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {titleDropdownOpen &&
              titleDropdownRect &&
              typeof document !== 'undefined' &&
              createPortal(
                <div
                  id="title-dropdown-portal"
                  className="fixed z-[9999] min-w-[120px] rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                  style={{ top: titleDropdownRect.top, left: titleDropdownRect.left }}
                >
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      runAndUpdate(() => document.execCommand('formatBlock', false, 'h2'));
                      setTitleDropdownOpen(false);
                    }}
                  >
                    제목 1
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      runAndUpdate(() => document.execCommand('formatBlock', false, 'h3'));
                      setTitleDropdownOpen(false);
                    }}
                  >
                    제목 2
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      runAndUpdate(() => document.execCommand('formatBlock', false, 'p'));
                      setTitleDropdownOpen(false);
                    }}
                  >
                    본문
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      runAndUpdate(() => document.execCommand('formatBlock', false, 'blockquote'));
                      setTitleDropdownOpen(false);
                    }}
                  >
                    인용구
                  </button>
                </div>,
                document.body
              )}
          </div>
          <button
            type="button"
            className={`${baseBtn} ${isActive('insertUnorderedList') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('insertUnorderedList'))}
            title="글머리 기호"
          >
            <BulletIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${baseBtn} ${isActive('insertOrderedList') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('insertOrderedList'))}
            title="번호 목록"
          >
            <NumberIcon className="h-5 w-5" />
          </button>
        </div>
        {sep}
        <div className={toolbarGroup}>
          <button
            type="button"
            className={`${baseBtn} min-w-[40px] ${isActive('justifyLeft') ? activeBtn : ''}`}
            onClick={() => runAndUpdate(() => document.execCommand('justifyLeft'))}
            title="왼쪽 정렬"
          >
            <AlignIcon className="h-5 w-5" />
          </button>
        </div>
        {sep}
        <div className={`${toolbarGroup} shrink-0 pl-1 pr-6`}>
          <button
            type="button"
            className={`${baseBtn} min-w-[40px]`}
            onClick={() => editorImageInputRef.current?.click()}
            title="이미지 삽입"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${baseBtn} min-w-[40px]`}
            onClick={onEditorVideoInsert}
            title="동영상 삽입"
          >
            <VideoIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${baseBtn} min-w-[40px]`}
            onClick={() => {
              const url = window.prompt('링크 URL을 입력하세요');
              if (url?.trim())
                runEditorCommand(() => document.execCommand('createLink', false, url.trim()));
            }}
            title="링크 삽입"
          >
            <EditorLinkIcon className="h-5 w-5" />
          </button>
        </div>
        {/* 745px 이상에서만 취소/저장 표시 */}
        <div className="ml-auto hidden shrink-0 pl-2 min-[745px]:flex">{cancelSaveButtons}</div>
      </div>
    </>
  );
}
