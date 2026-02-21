import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';

import { WikiEditorToolbar } from './WikiEditorToolbar';
import { WikiEditorBody } from './WikiEditorBody';
import { WikiContentEmpty } from './WikiContentEmpty';
import { WikiContentView } from './WikiContentView';

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
  sessionTimeLeft?: number;
  formatSessionTime?: () => string;
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
  sessionTimeLeft,
  formatSessionTime,
}: WikiContentAreaProps) {
  const [, setToolbarTick] = useState(0);

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

  if (isEditMode) {
    return (
      <div className="w-[1120px] max-w-full rounded-[10px] border border-gray-200 bg-white overflow-hidden">
        <WikiEditorToolbar
          profile={profile}
          editForm={editForm}
          updateField={updateField}
          runEditorCommand={runEditorCommand}
          onToolbarChange={() => setToolbarTick((t) => t + 1)}
          editorImageInputRef={editorImageInputRef}
          onEditorVideoInsert={onEditorVideoInsert}
          sessionTimeLeft={sessionTimeLeft}
          formatSessionTime={formatSessionTime}
        />
        <WikiEditorBody
          editorContentRef={editorContentRef}
          editorImageInputRef={editorImageInputRef}
          updateField={updateField}
          runEditorCommand={runEditorCommand}
          saveEditorSelection={saveEditorSelection}
          onEditorImageSelect={onEditorImageSelect}
        />
      </div>
    );
  }

  if (!hasContent) {
    return <WikiContentEmpty onStartEdit={onStartEdit} />;
  }

  return <WikiContentView content={profile.content ?? ''} />;
}
