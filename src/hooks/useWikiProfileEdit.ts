import { useCallback, useEffect, useRef, useState } from 'react';

import { ping, updateProfile } from '@/api/wiki.api';
import { uploadImage } from '@/api/image.api';
import { isValidImage } from '@/utils/wiki.utils';
import { useNotificationTriggerStore, useNotificationListStore } from '@/stores/notification.store';
import { useTimer } from '@/hooks/useTimer';
import type { Profile, UpdateProfileRequest } from '@/types/wiki.types';

const PING_THROTTLE_MS = 3 * 60 * 1000;

const EDIT_SESSION_SECONDS = 5 * 60;

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
  const lastPingTimeRef = useRef(0);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const isEditModeRef = useRef(isEditMode);
  isEditModeRef.current = isEditMode;
  const triggerNotificationRefetch = useNotificationTriggerStore((s) => s.triggerRefetch);
  const addLocalNotification = useNotificationListStore((s) => s.addLocalNotification);

  // 다른 페이지로 이동하거나 컴포넌트 언마운트 시 편집 상태 정리
  useEffect(() => {
    return () => {
      lastPingTimeRef.current = 0;
    };
  }, []);

  const sessionEndRef = useRef<() => void>(() => {});
  sessionEndRef.current = () => {
    lastPingTimeRef.current = 0;
    setIsTimeoutOpen(true);
    setIsEditMode(false);
  };

  const {
    reset: resetSessionTimer,
    start: startSessionTimer,
    pause: pauseSessionTimer,
    formatTime: formatSessionTime,
    timeLeft: sessionTimeLeft,
  } = useTimer({
    initialTime: EDIT_SESSION_SECONDS,
    onTimeEnd: () => sessionEndRef.current(),
  });

  const resetInactivityTimer = useCallback(() => {
    resetSessionTimer();
    startSessionTimer();
  }, [resetSessionTimer, startSessionTimer]);

  const throttledPing = useCallback(() => {
    if (!code || !securityAnswerRef.current) return;
    const now = Date.now();
    if (now - lastPingTimeRef.current < PING_THROTTLE_MS) return;
    lastPingTimeRef.current = now;
    ping(code, securityAnswerRef.current).catch(() => {
      setIsTimeoutOpen(true);
      setIsEditMode(false);
    });
  }, [code]);

  const updateField = useCallback(
    (key: string, value: string) => {
      setEditForm((prev) => ({ ...prev, [key]: value }));
      resetInactivityTimer();
      throttledPing();
    },
    [resetInactivityTimer, throttledPing]
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
    if (!isEditMode) return;
    resetInactivityTimer();
    return () => {
      pauseSessionTimer();
    };
  }, [isEditMode, resetInactivityTimer, pauseSessionTimer]);

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
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status === 401) {
          setQuizError('인증이 만료되었습니다. 다시 로그인해 주세요.');
        } else {
          setQuizError('퀴즈 정답이 아닙니다.');
        }
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
      lastPingTimeRef.current = 0;
      if (isMyWiki && isValidImage(updated.image)) {
        setProfileImageUrl(updated.image);
      }
      addLocalNotification('내 위키가 수정되었습니다.');
      triggerNotificationRefetch();
      showSnackbar('저장되었습니다.', 'success');
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
    lastPingTimeRef.current = 0;
  }, []);

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
    [updateField, showSnackbar]
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
    securityAnswerRef,
    sessionTimeLeft,
    formatSessionTime,
  };
}
