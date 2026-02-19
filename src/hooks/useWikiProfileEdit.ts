import { useCallback, useEffect, useRef, useState } from 'react';

import { ping, releaseProfilePing, updateProfile } from '@/api/wiki.api';
import { uploadImage } from '@/api/image.api';
import { isValidImage } from '@/utils/wiki.utils';
import { PING_INTERVAL_MS, EDIT_SESSION_TIMEOUT_MS } from '@/utils/wiki.constants';
import { useNotificationTriggerStore, useNotificationListStore } from '@/stores/notification.store';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';

export interface UseWikiProfileEditParams {
  code: string | undefined;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  isMyWiki: boolean;
  setProfileImageUrl: (url: string) => void;
  showSnackbar: (message: string, variant: 'success' | 'error' | 'info') => void;
}

export function useWikiProfileEdit({
  code,
  profile,
  setProfile,
  isMyWiki,
  setProfileImageUrl,
  showSnackbar,
}: UseWikiProfileEditParams) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<UpdateProfileRequest>({});
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [failedProfileImageUrls, setFailedProfileImageUrls] = useState<Set<string>>(new Set());
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [quizLoading, setQuizLoading] = useState(false);
  const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);

  const securityAnswerRef = useRef('');
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const triggerNotificationRefetch = useNotificationTriggerStore((s) => s.triggerRefetch);
  const addLocalNotification = useNotificationListStore((s) => s.addLocalNotification);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(async () => {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (code) {
        try {
          await releaseProfilePing(code);
        } catch {
          /* 백엔드 미지원 시 무시 */
        }
      }
      setIsTimeoutOpen(true);
      setIsEditMode(false);
    }, EDIT_SESSION_TIMEOUT_MS);
  }, [code]);

  const updateField = useCallback(
    (key: string, value: string) => {
      setEditForm((prev) => ({ ...prev, [key]: value }));
      resetInactivityTimer();
    },
    [resetInactivityTimer]
  );

  const markProfileImageFailed = useCallback((url: string) => {
    setFailedProfileImageUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);

  const showProfileImage = useCallback(
    (url: string | undefined | null) =>
      Boolean(url && isValidImage(url) && !failedProfileImageUrls.has(url)),
    [failedProfileImageUrls]
  );

  useEffect(() => {
    if (!isEditMode) setPreviewDataUrl(null);
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !code) return;
    const doPing = async () => {
      try {
        await ping(code, securityAnswerRef.current);
      } catch {
        setIsTimeoutOpen(true);
        setIsEditMode(false);
      }
    };
    pingIntervalRef.current = setInterval(doPing, PING_INTERVAL_MS);
    // 5분 비활성 타임아웃: 편집(입력 등) 시 resetInactivityTimer()로 리셋됨
    resetInactivityTimer();
    return () => {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    };
  }, [isEditMode, code, resetInactivityTimer]);

  const handleQuizSubmit = useCallback(
    async (answer: string) => {
      if (!code) return;
      setQuizLoading(true);
      setQuizError('');
      try {
        await ping(code, answer);
        securityAnswerRef.current = answer;
        setIsQuizOpen(false);
        if (profile) {
          setEditForm({
            content: profile.content ?? '',
            city: profile.city ?? '',
            mbti: profile.mbti ?? '',
            job: profile.job ?? '',
            sns: profile.sns ?? '',
            birthday: profile.birthday ?? '',
            nickname: profile.nickname ?? '',
            bloodType: profile.bloodType ?? '',
            nationality: profile.nationality ?? '',
            image: profile.image ?? '',
          });
        }
        setIsEditMode(true);
      } catch {
        setQuizError('퀴즈 정답이 아닙니다.');
      } finally {
        setQuizLoading(false);
      }
    },
    [code, profile]
  );

  const handleStartEdit = useCallback(() => {
    setQuizError('');
    setIsQuizOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!code) return;
    try {
      const updated = await updateProfile(code, {
        ...editForm,
        securityAnswer: securityAnswerRef.current,
      });
      setProfile(updated);
      setIsEditMode(false);
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (isMyWiki && isValidImage(updated.image)) {
        setProfileImageUrl(updated.image);
      }
      addLocalNotification('내 위키가 수정되었습니다.');
      triggerNotificationRefetch();
    } catch {
      showSnackbar('저장에 실패했습니다.', 'error');
    }
  }, [
    code,
    editForm,
    showSnackbar,
    isMyWiki,
    setProfileImageUrl,
    setProfile,
    triggerNotificationRefetch,
    addLocalNotification,
  ]);

  const handleCancel = useCallback(() => {
    setIsEditMode(false);
    if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
    if (code) releaseProfilePing(code).catch(() => {});
  }, [code]);

  const handleProfileImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showSnackbar('이미지 파일만 선택할 수 있습니다.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === 'string') {
          setPreviewDataUrl(ev.target.result);
        }
      };
      reader.readAsDataURL(file);
      try {
        const { url } = await uploadImage(file);
        if (url) {
          updateField('image', url);
          setProfileImageUrl(url);
          setPreviewDataUrl(null);
          showSnackbar('프로필 이미지가 변경되었습니다.', 'success');
        } else {
          showSnackbar('서버에서 이미지 주소를 받지 못했습니다.', 'error');
        }
      } catch {
        setPreviewDataUrl(null);
        showSnackbar('이미지 업로드에 실패했습니다. (최대 5MB)', 'error');
      }
      e.target.value = '';
    },
    [updateField, showSnackbar, setProfileImageUrl]
  );

  return {
    isEditMode,
    setIsEditMode,
    editForm,
    setEditForm,
    updateField,
    resetInactivityTimer,
    previewDataUrl,
    failedProfileImageUrls,
    markProfileImageFailed,
    showProfileImage,
    profileImageInputRef,
    isQuizOpen,
    setIsQuizOpen,
    quizError,
    quizLoading,
    isTimeoutOpen,
    setIsTimeoutOpen,
    handleQuizSubmit,
    handleStartEdit,
    handleSave,
    handleCancel,
    handleProfileImageSelect,
    pingIntervalRef,
    securityAnswerRef,
  };
}
