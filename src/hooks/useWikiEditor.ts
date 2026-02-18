import { useCallback, useRef } from 'react';

import { uploadImage } from '@/api/image.api';

export interface UseWikiEditorParams {
  /** 에디터 content 변경 시 호출 (innerHTML 반영) */
  updateContent: (html: string) => void;
  showSnackbar: (message: string, variant: 'success' | 'error' | 'info') => void;
}

export function useWikiEditor({ updateContent, showSnackbar }: UseWikiEditorParams) {
  const editorContentRef = useRef<HTMLDivElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  const saveEditorSelection = useCallback(() => {
    const sel = document.getSelection();
    const el = editorContentRef.current;
    if (!el || !sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (el.contains(range.commonAncestorContainer)) savedSelectionRef.current = range.cloneRange();
  }, []);

  const runEditorCommand = useCallback(
    (fn: () => void) => {
      const el = editorContentRef.current;
      if (!el) return;
      el.focus();
      const sel = document.getSelection();
      if (sel && savedSelectionRef.current) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRef.current);
      }
      fn();
      updateContent(el.innerHTML);
    },
    [updateContent]
  );

  const handleEditorImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) {
        if (file) showSnackbar('이미지 파일만 선택할 수 있습니다.', 'error');
        e.target.value = '';
        return;
      }
      try {
        const { url } = await uploadImage(file);
        if (!url) {
          showSnackbar('이미지 URL을 받지 못했습니다.', 'error');
          e.target.value = '';
          return;
        }
        runEditorCommand(() => {
          document.execCommand(
            'insertHTML',
            false,
            `<img src="${url}" alt="" style="max-width:100%;height:auto;" />`
          );
        });
        showSnackbar('이미지가 삽입되었습니다.', 'success');
      } catch {
        showSnackbar('이미지 업로드에 실패했습니다. (최대 5MB)', 'error');
      }
      e.target.value = '';
    },
    [runEditorCommand, showSnackbar]
  );

  const handleEditorVideoInsert = useCallback(() => {
    const url = window.prompt('동영상 URL을 입력하세요 (YouTube 등)');
    if (!url?.trim()) return;
    let embedUrl = url.trim();
    const ytMatch = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    runEditorCommand(() => {
      document.execCommand(
        'insertHTML',
        false,
        `<div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe></div>`
      );
    });
    showSnackbar('동영상이 삽입되었습니다.', 'success');
  }, [runEditorCommand, showSnackbar]);

  return {
    editorContentRef,
    editorImageInputRef,
    savedSelectionRef,
    saveEditorSelection,
    runEditorCommand,
    handleEditorImageSelect,
    handleEditorVideoInsert,
  };
}
