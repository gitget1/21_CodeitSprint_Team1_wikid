import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useSyncExternalStore, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { getNotifications, deleteNotification } from '@/api/notification.api';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useAuthStore } from '@/stores/auth.store';
import { useNotificationTriggerStore, useNotificationListStore } from '@/stores/notification.store';
import { useAlertStore } from '@/stores/alert.store';
import { getRelativeTime } from '@/utils/formatDate';
import BellIcon from '@/assets/icons/Bell.svg';
import ProfileIcon from '@/assets/icons/Profile.svg';
import MenuIcon from '@/assets/icons/Menu.svg';
import Logo from '@/assets/images/logo.png';

import Menu from '../ui/Menu';

const HOVER_GREEN = 'hover:text-primary-green-300';

function Navbar() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const profileImageUrl = useAuthStore((state) => state.profileImageUrl);
  const clearLogin = useAuthStore((state) => state.clearLogin);
  const showAlert = useAlertStore((state) => state.showAlert);

  const hasProfileImage = Boolean(
    profileImageUrl &&
    (profileImageUrl.startsWith('http://') || profileImageUrl.startsWith('https://'))
  );
  const isLoaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  //상태별 메뉴 목록 정의
  const guestMenu = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
    { label: '로그인', href: '/login' },
  ];

  const userMenu = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
    {
      label: '알림',
      href: '#',
      onClick: () => {
        handleToggleNoti();
        setOpenMenu(false);
      },
    },
    { label: '마이페이지', href: '/mypage' },
  ];

  const profileMenu = [
    { label: '계정설정', href: '/mypage' },
    {
      label: '내위키',
      href: user?.profile?.code ? `/wiki/${user.profile.code}` : '/mypage',
      onClick: user?.profile?.code
        ? undefined
        : () => {
            showAlert('위키를 생성해주세요');
          },
    },
    {
      label: '로그아웃',
      onClick: () => {
        clearLogin();
        router.push('/');
      },
      href: '/',
    },
  ];

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);

  const notifications = useNotificationListStore((s) => s.notifications);
  const setNotificationsFromApi = useNotificationListStore((s) => s.setNotificationsFromApi);
  const removeNotification = useNotificationListStore((s) => s.removeNotification);

  useOutsideClick(menuRef, () => setOpenMenu(false));
  useOutsideClick(profileRef, () => setOpenProfileMenu(false));
  useOutsideClick(notiRef, () => setIsNotiOpen(false));

  const refetchTrigger = useNotificationTriggerStore((s) => s.refetchTrigger);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getNotifications({ page: 1, pageSize: 20 });
      setNotificationsFromApi(res.list);
    } catch {
      /* ignore */
    }
  }, [setNotificationsFromApi]);

  useEffect(() => {
    if (refetchTrigger > 0) queueMicrotask(() => fetchNotifications());
  }, [refetchTrigger, fetchNotifications]);

  const handleToggleNoti = useCallback(() => {
    if (!isNotiOpen) fetchNotifications();
    setIsNotiOpen((prev) => !prev);
    setOpenProfileMenu(false);
  }, [isNotiOpen, fetchNotifications]);

  const handleDeleteNoti = useCallback(
    async (id: number) => {
      if (id > 0) {
        try {
          await deleteNotification(id);
        } catch {
          /* ignore */
        }
      }
      removeNotification(id);
    },
    [removeNotification]
  );

  return (
    <div className="h-15 xl:h-20 px-5 lg:px-20 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center justify-between gap-10">
        <Link href="/">
          <Image src={Logo} alt="logo" className="w-[107px] object-cover cursor-pointer" />
        </Link>
        <Link
          href="/wikilist"
          className={`hidden md:block text-gray-600 text-md-regular ${HOVER_GREEN}`}
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className={`hidden md:block text-gray-600 text-md-regular ${HOVER_GREEN}`}
        >
          자유게시판
        </Link>
      </div>
      <div>
        <div className="hidden md:flex items-center">
          {isLoaded && !isLoggedIn && (
            <Link href="/login" className={`text-gray-400 text-md-regular ${HOVER_GREEN}`}>
              로그인
            </Link>
          )}

          {isLoaded && isLoggedIn && (
            <div className="flex items-center justify-center gap-6">
              <div className="relative" ref={notiRef}>
                <button
                  type="button"
                  onClick={handleToggleNoti}
                  className="flex items-center justify-center"
                  aria-expanded={isNotiOpen}
                  aria-label="알림"
                >
                  <BellIcon className={`h-8 w-8 text-gray-400 ${HOVER_GREEN}`} />
                </button>
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {notifications.length}
                  </span>
                )}
                {isNotiOpen && (
                  <div className="absolute right-0 top-10 z-50 w-[320px] rounded-[10px] bg-white p-4 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#474D66]">
                        알림 {notifications.length}개
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsNotiOpen(false)}
                        className="rounded p-1 text-[#8F95B2] hover:bg-[#F7F7FA] hover:text-[#474D66]"
                        aria-label="알림 창 닫기"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="py-8 text-center text-sm text-gray-500">알림이 없습니다.</p>
                    ) : (
                      <ul className="flex max-h-[320px] flex-col gap-3 overflow-y-auto">
                        {notifications.map((noti) => (
                          <li
                            key={noti.id}
                            className="flex items-start gap-3 rounded-[10px] bg-white p-4 shadow-sm"
                          >
                            <span
                              className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${noti.type === 'failure' ? 'bg-red-500' : 'bg-blue-500'}`}
                              aria-hidden
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-[#474D66]">{noti.content}</p>
                              <p className="mt-1 text-xs text-[#8F95B2]">
                                {getRelativeTime(noti.createdAt)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteNoti(noti.id)}
                              className="shrink-0 rounded p-1 text-[#8F95B2] hover:bg-gray-100 hover:text-[#474D66]"
                              aria-label="알림 삭제"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                              >
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenProfileMenu(!openProfileMenu);
                    setIsNotiOpen(false);
                  }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full "
                >
                  {hasProfileImage ? (
                    <Image
                      src={profileImageUrl!}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <ProfileIcon className={`h-8 w-8 text-gray-400 shrink-0 ${HOVER_GREEN}`} />
                  )}
                </button>
                {openProfileMenu && (
                  <Menu items={profileMenu} onClose={() => setOpenProfileMenu(false)} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative md:hidden" ref={menuRef}>
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(!openMenu);
              setIsNotiOpen(false);
            }}
            className="flex items-center justify-center"
          >
            <MenuIcon className={`block text-gray-400 text-md-regular ${HOVER_GREEN}`} />
          </button>
          {openMenu && isLoaded && (
            <Menu items={isLoggedIn ? userMenu : guestMenu} onClose={() => setOpenMenu(false)} />
          )}
          {isNotiOpen && isLoaded && isLoggedIn && (
            <div className="absolute right-0 top-10 z-50 w-[320px] rounded-[10px] bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#474D66]">
                  알림 {notifications.length}개
                </h3>
                <button
                  type="button"
                  onClick={() => setIsNotiOpen(false)}
                  className="rounded p-1 text-[#8F95B2] hover:bg-[#F7F7FA] hover:text-[#474D66]"
                  aria-label="알림 창 닫기"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {notifications.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">알림이 없습니다.</p>
              ) : (
                <ul className="flex max-h-[320px] flex-col gap-3 overflow-y-auto">
                  {notifications.map((noti) => (
                    <li
                      key={noti.id}
                      className="flex items-start gap-3 rounded-[10px] bg-white p-4 shadow-sm"
                    >
                      <span
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${noti.type === 'failure' ? 'bg-red-500' : 'bg-blue-500'}`}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#474D66]">{noti.content}</p>
                        <p className="mt-1 text-xs text-[#8F95B2]">
                          {getRelativeTime(noti.createdAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteNoti(noti.id)}
                        className="shrink-0 rounded p-1 text-[#8F95B2] hover:bg-gray-100 hover:text-[#474D66]"
                        aria-label="알림 삭제"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
