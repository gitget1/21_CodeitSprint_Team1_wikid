import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useAuthStore } from '@/stores/auth.store';


import BellIcon from '@/assets/icons/Bell.svg';
import ProfileIcon from '@/assets/icons/Profile.svg';
import MenuIcon from '@/assets/icons/Menu.svg';
import Logo from '@/assets/images/logo.png';

import Menu from '../ui/Menu';

const HOVER_GREEN = 'hover:text-primary-green-300';

function Navbar() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearLogin = useAuthStore((state) => state.clearLogin);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //상태별 메뉴 목록 정의
  const guestMenu = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
    { label: '로그인', href: '/login' },
  ];

  const userMenu = [
    { label: '위키목록', href: '/wikilist' },
    { label: '자유게시판', href: '/boards' },
    { label: '알림', href: '/mypage' }, //알림은 클릭했을 때 어디로 가는지? 모달? 임시링크임
    { label: '마이페이지', href: '/mypage' },
  ];

  const profileMenu = [
    { label: '계정설정', href: '/mypage' },
    { label: '내위키', href: '/mypage' }, //임시링크임 나중에 본인 위키 해당하는 id 부여해서 다시 링크 설정
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
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => setOpenMenu(false));
  useOutsideClick(profileRef, () => setOpenProfileMenu(false));

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
            <Link
              href="/login"
              className={`text-gray-400 text-md-regular ${HOVER_GREEN}`}
            >
              로그인
            </Link>
          )}

          {isLoaded && isLoggedIn && (

            <div className=" flex justify-center items-center gap-6 ">
              <BellIcon
                className={` text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`}
              />
              <div className="relative" ref={profileRef}>
                <ProfileIcon
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                  className={`text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`}
                />
                {openProfileMenu && <Menu items={profileMenu} />}
              </div>
            </div>
          )}
        </div>
        <div className="relative md:hidden" ref={menuRef}>
          <MenuIcon
            onClick={() => setOpenMenu(!openMenu)}
            className={`block text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`}
          />
          {openMenu && isLoaded && <Menu items={isLoggedIn ? userMenu : guestMenu} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
