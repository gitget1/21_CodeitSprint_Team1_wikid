import type { RefObject } from 'react';

const EDITOR_CONTENT_CLASS =
  'min-h-[200px] max-w-full overflow-x-auto p-4 text-gray-700 outline-none [&_img]:max-w-full [&_img]:h-auto [&_h2]:mt-8 [&_h2]:mb-0 [&_h2]:pb-6 [&_h2]:border-b [&_h2]:border-gray-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#474D66] [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:mb-0 [&_h3]:pb-4 [&_h3]:border-b [&_h3]:border-gray-200 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#474D66] [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#474D66] [&_blockquote]:border-l-4 [&_blockquote]:border-gray-800 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-3 [&_blockquote]:text-gray-600 [&_blockquote]:min-h-[1em] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-0.5 [&_.video-wrapper]:relative [&_.video-wrapper]:pb-[56.25%] [&_.video-wrapper]:h-0 [&_.video-wrapper]:overflow-hidden [&_iframe]:absolute [&_iframe]:left-0 [&_iframe]:top-0 [&_iframe]:h-full [&_iframe]:w-full';

export interface WikiEditorBodyProps {
  editorContentRef: RefObject<HTMLDivElement | null>;
  editorImageInputRef: RefObject<HTMLInputElement | null>;
  updateField: (key: string, value: string) => void;
  runEditorCommand: (fn: () => void) => void;
  saveEditorSelection: () => void;
  onEditorImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function WikiEditorBody({
  editorContentRef,
  editorImageInputRef,
  updateField,
  runEditorCommand,
  saveEditorSelection,
  onEditorImageSelect,
}: WikiEditorBodyProps) {
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

  return (
    <>
      <div
        ref={editorContentRef}
        className={EDITOR_CONTENT_CLASS}
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
    </>
  );
}
