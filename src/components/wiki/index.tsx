import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';

import BoldIcon from '@/assets/icons/ic_bold.svg';
import ItalicIcon from '@/assets/icons/ic_italic.svg';
import UnderlineIcon from '@/assets/icons/ic_underline.svg';
import AlignIcon from '@/assets/icons/ic_align.svg';
import BulletIcon from '@/assets/icons/ic_bullet.svg';
import NumberIcon from '@/assets/icons/ic_number.svg';
import ImageIcon from '@/assets/icons/ic_image.svg';
import EditorLinkIcon from '@/assets/icons/ic_link.svg';
import VideoIcon from '@/assets/icons/ic_video.svg';
import CameraIcon from '@/assets/icons/ic_camera.svg';
import ProfileIcon from '@/assets/icons/Profile.svg';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';

/** 이미지 URL 유효 여부 (http/https 및 이미지 확장자 또는 도메인 기준) */
export function isValidImage(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    return trimmed.startsWith('http://') || trimmed.startsWith('https://');
  } catch {
    return false;
  }
}

/** ping 주기 (ms) */
export const PING_INTERVAL_MS = 60 * 1000;

export interface WikiNameAndLinkProps {
  name: string;
  linkDisplayText: string;
  onCopyLink: () => void;
  /** URL 바 오른쪽에 배치할 액션 (예: 위키 참여하기 버튼) */
  actionSlot?: ReactNode;
}

/** 링크 아이콘 (SVG) */
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7 0l4-4a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-4 4a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  );
}

export function WikiNameAndLink({
  name,
  linkDisplayText,
  onCopyLink,
  actionSlot,
}: WikiNameAndLinkProps) {
  return (
    <div className="flex min-w-0 w-[860px] max-w-full flex-col justify-center gap-3 min-[745px]:h-[112px]">
      {/* 1행: 이름(왼쪽) + 위키 참여하기(오른쪽) — 이미지와 동일 */}
      <div className="flex min-w-0 items-center gap-3">
        <h1
          className="min-w-0 flex-1 font-semibold text-gray-800 leading-[46px] max-[744px]:truncate max-[744px]:text-2xl max-[744px]:leading-tight min-[745px]:text-[48px]"
          style={{
            fontFamily: 'var(--font-pretendard), Pretendard, sans-serif',
            letterSpacing: '0%',
            fontSize: 'clamp(1.5rem, 5vw, 48px)',
          }}
        >
          {name}
        </h1>
        {actionSlot && <div className="flex shrink-0 items-center">{actionSlot}</div>}
      </div>
      {/* 2행: 링크만 */}
      <div className="flex min-w-0 flex-wrap items-center gap-[10px]">
        <button
          type="button"
          onClick={onCopyLink}
          className="group flex h-[34px] min-w-0 max-w-full shrink-0 items-center gap-[10px] rounded-[10px] bg-primary-green-100 px-[10px] py-[5px] text-left text-[14px] font-medium text-primary-green-300 transition-colors hover:bg-primary-green-200 hover:text-white max-[744px]:w-full min-[745px]:w-max"
        >
          <LinkIcon className="h-5 w-5 shrink-0 text-primary-green-300 group-hover:text-white" />
          <span className="min-w-0 break-all">{linkDisplayText}</span>
        </button>
      </div>
    </div>
  );
}

export interface WikiContentAreaProps {
  isEditMode: boolean;
  hasContent: boolean;
  profile: Profile;
  editForm: UpdateProfileRequest;
  editorContentRef: RefObject<HTMLDivElement | null>;
  editorImageInputRef: RefObject<HTMLInputElement | null>;
  updateField: (key: string, value: string) => void;
  runEditorCommand: (fn: () => void) => void;
  saveEditorSelection: () => void;
  onEditorImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditorVideoInsert: () => void;
  onStartEdit: () => void;
}

export function WikiContentArea({
  isEditMode,
  hasContent,
  profile,
  editForm,
  editorContentRef,
  editorImageInputRef,
  updateField,
  runEditorCommand,
  saveEditorSelection,
  onEditorImageSelect,
  onEditorVideoInsert,
  onStartEdit,
}: WikiContentAreaProps) {
  const [, setToolbarTick] = useState(0);
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);
  const [titleDropdownRect, setTitleDropdownRect] = useState<{ top: number; left: number } | null>(
    null
  );
  const titleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditMode || !editorContentRef.current) return;
    const el = editorContentRef.current;
    let rafId: number;
    const onSelectionChange = () => {
      if (typeof document === 'undefined' || !document.getSelection) return;
      const sel = document.getSelection();
      if (!sel?.rangeCount || !el.contains(sel.anchorNode)) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setToolbarTick((t) => t + 1));
    };
    document.addEventListener('selectionchange', onSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
      cancelAnimationFrame(rafId);
    };
  }, [isEditMode, editorContentRef]);

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

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editorContentRef.current) return;
    const sel = document.getSelection();
    if (!sel?.anchorNode || !editorContentRef.current.contains(sel.anchorNode)) return;
    let block: HTMLElement | null =
      sel.anchorNode.nodeType === Node.TEXT_NODE
        ? (sel.anchorNode.parentElement as HTMLElement)
        : (sel.anchorNode as HTMLElement);
    const getBlock = () => {
      while (block && block !== editorContentRef.current) {
        if (
          block.tagName === 'H2' ||
          block.tagName === 'H3' ||
          block.tagName === 'LI' ||
          block.tagName === 'P'
        )
          return block;
        block = block.parentElement;
      }
      return null;
    };
    const currentBlock = getBlock();

    if (e.key === 'Enter') {
      block = currentBlock;
      while (block && block !== editorContentRef.current) {
        if (block.tagName === 'H2' || block.tagName === 'H3') {
          e.preventDefault();
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          if (block.nextSibling) {
            editorContentRef.current.insertBefore(p, block.nextSibling);
          } else {
            editorContentRef.current.appendChild(p);
          }
          const range = document.createRange();
          range.setStart(p, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          updateField('content', editorContentRef.current.innerHTML);
          break;
        }
        block = block.parentElement;
      }
      return;
    }

    if (e.key === 'Backspace' && currentBlock?.tagName === 'LI') {
      const text = currentBlock.textContent?.trim() ?? '';
      const isEffectivelyEmpty = !text || text === '';
      const isLastItem = !currentBlock.nextSibling;
      if (isEffectivelyEmpty && isLastItem) {
        e.preventDefault();
        const list = currentBlock.parentElement;
        if (list && (list.tagName === 'UL' || list.tagName === 'OL') && editorContentRef.current) {
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          list.parentNode?.insertBefore(p, list.nextSibling);
          currentBlock.remove();
          if (list.childNodes.length === 0) list.remove();
          const range = document.createRange();
          range.setStart(p, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          updateField('content', editorContentRef.current.innerHTML);
        }
      }
    }
  };

  if (isEditMode) {
    const baseBtn =
      'flex h-9 w-9 shrink-0 items-center justify-center rounded border-0 bg-transparent text-[#474D66] hover:bg-gray-100 hover:text-gray-800';
    const activeBtn =
      'bg-primary-green-100 text-primary-green-300 hover:bg-primary-green-100 hover:text-primary-green-300';
    const sep = <span className="mx-1 h-5 w-px shrink-0 bg-gray-300" aria-hidden />;
    const toolbarGroup = 'flex shrink-0 items-center gap-0.5';
    const isActive = (cmd: string) =>
      typeof document !== 'undefined' && document.queryCommandState?.(cmd);
    const runAndUpdate = (fn: () => void) => {
      runEditorCommand(fn);
      setToolbarTick((t) => t + 1);
    };
    return (
      <div className="w-[1120px] max-w-full rounded-[10px] border border-gray-200 bg-white overflow-hidden">
        {/* 1120×60: 이름 | B,I,U | 제목▼·목록 | 정렬·이미지·카메라·링크 (연한 회색 배경) */}
        <div className="flex h-[60px] min-w-0 flex-nowrap items-center overflow-x-auto overflow-y-visible border-b border-gray-200 bg-[#F7F7FA] pl-4 pr-24">
          {/* 구역1: 이름 */}
          <div className={toolbarGroup}>
            <input
              type="text"
              value={editForm.name ?? profile.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="h-9 min-w-[100px] max-w-[200px] rounded border-0 bg-white px-3 text-base font-medium text-gray-800 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-green-200"
              placeholder="이름"
            />
          </div>
          {sep}
          {/* 구역2: 글자 스타일 — B, I, U */}
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
          {/* 구역3: 제목▼, 글머리, 번호 목록 */}
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
                <svg
                  className={`h-4 w-4 shrink-0 ${titleDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
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
          {/* 구역4: 정렬 */}
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
          {/* 구역5: 이미지, 동영상, 링크 */}
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
        </div>
        <div
          ref={editorContentRef}
          className="min-h-[200px] max-w-full overflow-x-auto p-4 text-gray-700 outline-none [&_img]:max-w-full [&_img]:h-auto [&_h2]:mt-8 [&_h2]:mb-0 [&_h2]:pb-6 [&_h2]:border-b [&_h2]:border-gray-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#474D66] [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:mb-0 [&_h3]:pb-4 [&_h3]:border-b [&_h3]:border-gray-200 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#474D66] [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#474D66] [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-3 [&_blockquote]:text-gray-600 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-0.5 [&_.video-wrapper]:relative [&_.video-wrapper]:pb-[56.25%] [&_.video-wrapper]:h-0 [&_.video-wrapper]:overflow-hidden [&_iframe]:absolute [&_iframe]:left-0 [&_iframe]:top-0 [&_iframe]:h-full [&_iframe]:w-full"
          contentEditable
          suppressContentEditableWarning
          onBlur={saveEditorSelection}
          onClick={(e) => {
            const el = editorContentRef.current;
            if (!el || e.target !== el) return;
            const sel = document.getSelection();
            if (!sel) return;
            const clickY = (e as React.MouseEvent).clientY;
            const blocks = el.querySelectorAll('h2, h3, p, div, ul, ol, blockquote');
            let targetBlock: Element | null = null;
            for (let i = blocks.length - 1; i >= 0; i--) {
              const rect = blocks[i].getBoundingClientRect();
              if (rect.bottom <= clickY) {
                targetBlock = blocks[i];
                break;
              }
            }
            if (!targetBlock) targetBlock = blocks[0] ?? el;
            const range = document.createRange();
            range.setStart(targetBlock, targetBlock.childNodes.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }}
          onKeyDown={handleEditorKeyDown}
          onInput={(e) => updateField('content', (e.target as HTMLDivElement).innerHTML)}
        />
        <input
          ref={editorImageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onEditorImageSelect}
          aria-hidden
        />
      </div>
    );
  }
  if (!hasContent) {
    return (
      <div className="flex min-h-[192px] w-full max-w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-[#F7F7FA] px-6 py-10 text-center max-[375px]:px-4 max-[375px]:py-8 min-[860px]:w-[859px] min-[860px]:px-[345px] min-[860px]:py-[40px]">
        <p className="whitespace-nowrap text-base text-gray-500 max-[375px]:whitespace-normal">
          아직 작성된 내용이 없네요.
        </p>
        <p className="whitespace-nowrap text-base text-gray-500 max-[375px]:whitespace-normal">
          위키에 참여해 보세요!
        </p>
        <button
          type="button"
          onClick={onStartEdit}
          className="shrink-0 whitespace-nowrap rounded-[10px] bg-primary-green-200 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-green-300 max-[375px]:whitespace-normal"
        >
          시작하기
        </button>
      </div>
    );
  }
  return (
    <div
      className="prose max-w-none rounded-[10px] border border-gray-200 bg-white p-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-gray-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#474D66] [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:pb-2 [&_h3]:border-b [&_h3]:border-gray-200 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#474D66] [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#474D66] [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-3 [&_blockquote]:text-gray-600 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5 [&_.video-wrapper]:relative [&_.video-wrapper]:h-0 [&_.video-wrapper]:overflow-hidden [&_.video-wrapper]:pb-[56.25%] [&_iframe]:absolute [&_iframe]:left-0 [&_iframe]:top-0 [&_iframe]:h-full [&_iframe]:w-full"
      dangerouslySetInnerHTML={{ __html: profile.content ?? '' }}
    />
  );
}

export interface WikiProfileSidebarProps {
  isEditMode: boolean;
  profile: Profile;
  editForm: UpdateProfileRequest;
  isMyWiki: boolean;
  profileImageInputRef: RefObject<HTMLInputElement | null>;
  previewDataUrl: string | null;
  showProfileImage: (url: string | undefined | null) => boolean;
  markProfileImageFailed: (url: string) => void;
  updateField: (key: string, value: string) => void;
  onProfileImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const PROFILE_LABELS: { key: keyof Profile; label: string }[] = [
  { key: 'city', label: '거주 도시' },
  { key: 'mbti', label: 'MBTI' },
  { key: 'job', label: '직업' },
  { key: 'sns', label: 'SNS 계정' },
  { key: 'birthday', label: '생일' },
  { key: 'nickname', label: '별명' },
  { key: 'bloodType', label: '혈액형' },
  { key: 'nationality', label: '국적' },
];

function formatProfileValue(value: string | undefined | null): string {
  if (value === undefined || value === null || value.trim() === '') return '-';
  return value.trim();
}

const PROFILE_PREVIEW_KEYS: (keyof Profile)[] = ['city', 'mbti', 'job'];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function WikiProfileSidebar({
  isEditMode,
  profile,
  editForm,
  isMyWiki,
  profileImageInputRef,
  previewDataUrl,
  showProfileImage,
  markProfileImageFailed,
  updateField,
  onProfileImageSelect,
  onSave,
  onCancel,
}: WikiProfileSidebarProps) {
  const [expanded744, setExpanded744] = useState(false);
  const imageUrl =
    previewDataUrl ??
    (showProfileImage(editForm.image ?? profile.image)
      ? (editForm.image ?? profile.image)
      : undefined);
  const displayProfile = isEditMode ? { ...profile, ...editForm } : profile;

  const triggerImageSelect = () => {
    if (isMyWiki && isEditMode) profileImageInputRef.current?.click();
  };

  const compactPreview = (
    <div
      className="flex flex-col rounded-[10px] border border-gray-200 bg-white p-4 min-[745px]:hidden"
      style={{
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={triggerImageSelect}
          className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200 focus:outline-none"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => markProfileImageFailed(imageUrl)}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full text-gray-500">
              <ProfileIcon className="h-full w-full shrink-0" />
            </span>
          )}
          {isEditMode && isMyWiki && (
            <span className="absolute inset-0 grid place-items-center rounded-full bg-black/30 pointer-events-none">
              <CameraIcon className="h-6 w-6 shrink-0 block brightness-0 invert" />
            </span>
          )}
        </button>
        <div className="min-w-0 flex-1">
          {PROFILE_PREVIEW_KEYS.map((key) => (
            <p key={key} className="truncate text-sm">
              <span className="text-[#8F95B2]">
                {PROFILE_LABELS.find((l) => l.key === key)?.label}
              </span>{' '}
              <span className="text-[#474D66]">
                {formatProfileValue(displayProfile[key] as string)}
              </span>
            </p>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setExpanded744((e) => !e)}
        className="mt-2 flex w-full justify-center text-gray-400 hover:text-gray-600"
        aria-expanded={expanded744}
      >
        <ChevronDownIcon className={expanded744 ? 'rotate-180' : ''} />
      </button>
    </div>
  );

  const fullSidebar = (
    <div
      className="rounded-[10px] border border-gray-200 bg-white p-6 max-[744px]:rounded-t-none max-[744px]:border-t-0"
      style={{
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.04)',
      }}
    >
      <h2 className="mb-5 text-center text-lg font-semibold text-gray-800">프로필</h2>
      <div className="flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={triggerImageSelect}
          className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full bg-gray-100 shadow-md focus:outline-none"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => markProfileImageFailed(imageUrl)}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full text-gray-500">
              <ProfileIcon className="h-full w-full shrink-0" />
            </span>
          )}
          {isEditMode && isMyWiki && (
            <span className="absolute inset-0 grid place-items-center rounded-full bg-black/30 pointer-events-none">
              <CameraIcon className="h-12 w-12 shrink-0 block brightness-0 invert" />
            </span>
          )}
        </button>
        {isEditMode && isMyWiki ? (
          <ul className="w-full space-y-3">
            {PROFILE_LABELS.map(({ key, label }) => (
              <li key={key} className="flex flex-col gap-1.5 text-sm">
                <span className="shrink-0 text-gray-500">{label}</span>
                <input
                  type="text"
                  value={(displayProfile[key] as string) ?? ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full rounded-[10px] border border-gray-200 bg-[#F7F7FA] px-3 py-2 text-gray-700 outline-none placeholder:text-gray-400 focus:border-primary-green-200"
                  placeholder={label}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="w-full space-y-3">
            {PROFILE_LABELS.map(({ key, label }) => (
              <li key={key} className="flex items-baseline gap-5 text-sm">
                <span className="shrink-0 text-[#8F95B2]">{label}</span>
                <span className="min-w-0 flex-1 truncate text-[#474D66]">
                  {formatProfileValue(displayProfile[key] as string)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const profileCardButtons = isEditMode && isMyWiki && (
    <div className="mt-4 flex w-full justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="h-10 w-[65px] shrink-0 rounded-[10px] border border-primary-green-300 text-sm font-semibold text-primary-green-300 hover:bg-gray-50"
      >
        취소
      </button>
      <button
        type="button"
        onClick={onSave}
        className="h-10 w-[65px] shrink-0 rounded-[10px] bg-primary-green-200 text-sm font-semibold text-white hover:bg-primary-green-300"
      >
        저장
      </button>
    </div>
  );

  return (
    <aside
      className={`min-w-0 shrink-0 max-[744px]:order-1 max-[744px]:w-full max-[744px]:max-w-[744px] ${isEditMode ? 'min-[745px]:w-[400px]' : 'min-[745px]:w-[280px]'}`}
    >
      <input
        ref={profileImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onProfileImageSelect}
        aria-hidden
      />
      {/* 744px 이하: 접었을 때 compactPreview, 펼치면 fullSidebar + 접기 버튼 */}
      <div className="max-[744px]:rounded-[10px] max-[744px]:border max-[744px]:border-gray-200 max-[744px]:overflow-visible max-[744px]:bg-transparent min-[745px]:hidden">
        {!expanded744 && compactPreview}
        {expanded744 && (
          <>
            <button
              type="button"
              onClick={() => setExpanded744(false)}
              className="flex w-full items-center justify-center gap-1 border-b border-gray-200 bg-white py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              aria-expanded="true"
            >
              <ChevronDownIcon className="rotate-180" />
              <span>접기</span>
            </button>
            {fullSidebar}
            {profileCardButtons}
          </>
        )}
      </div>
      {/* 745px 이상: 프로필 카드 + 카드 밖 취소/저장 버튼 */}
      <div className="hidden min-[745px]:block w-full">
        {fullSidebar}
        {profileCardButtons}
      </div>
    </aside>
  );
}
