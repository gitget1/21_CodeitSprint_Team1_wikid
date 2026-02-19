import { useState } from 'react';
import type { RefObject } from 'react';

import ProfileIcon from '@/assets/icons/Profile.svg';
import CameraIcon from '@/assets/icons/ic_camera.svg';
import { ChevronDownIcon } from '@/components/ui/ChevronDownIcon';
import { PROFILE_LABELS, PROFILE_PREVIEW_KEYS } from '@/utils/wiki.constants';
import { formatProfileValue } from '@/utils/wiki.utils';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';

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
          <ul className="grid w-full grid-cols-1 gap-x-4 gap-y-3 min-[376px]:max-[744px]:grid-cols-2">
            {PROFILE_LABELS.map(({ key, label }) => (
              <li key={key} className="flex min-w-0 flex-col gap-1.5 text-sm">
                <span className="shrink-0 text-gray-500">{label}</span>
                <input
                  type="text"
                  value={(displayProfile[key] as string) ?? ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="min-w-0 w-full rounded-[10px] border border-gray-200 bg-[#F7F7FA] px-3 py-2 text-gray-700 outline-none placeholder:text-gray-400 focus:border-primary-green-200"
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

  const buttonPair = (
    <>
      <button
        type="button"
        onClick={onCancel}
        className="h-10 w-[65px] shrink-0 rounded-[10px] border border-current text-sm font-semibold text-primary-green-300 hover:bg-gray-50"
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
    </>
  );

  const profileCardButtons = isEditMode && isMyWiki && (
    <div className="mt-4 flex w-full justify-end gap-2 min-[745px]:flex max-[744px]:hidden">
      {buttonPair}
    </div>
  );

  const profileCardButtonsTop744 = isEditMode && isMyWiki && (
    <div className="mb-2 flex w-full justify-end gap-2 max-[744px]:flex min-[745px]:hidden">
      {buttonPair}
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
      <div className="max-[744px]:rounded-[10px] max-[744px]:border max-[744px]:border-gray-200 max-[744px]:overflow-visible max-[744px]:bg-transparent min-[745px]:hidden">
        {profileCardButtonsTop744}
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
          </>
        )}
      </div>
      <div className="hidden min-[745px]:block w-full">
        {fullSidebar}
        {profileCardButtons}
      </div>
    </aside>
  );
}
