import { useState } from 'react';
import Image from 'next/image';

import { BellIcon } from '@/assets/icons/Bell';
import { UserIcon } from '@/assets/icons/User';
import { MenuIcon } from '@/assets/icons/Menu';
import Logo from '@/assets/images/logo.png';

const HOVER_GREEN = 'hover:text-primary-green-300';

function Navbar() {
  //임시 로그인 상태
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="h-15 xl:h-20 px-5 lg:px-20 py-4 flex justify-between items-center">
      <div className="flex items-center justify-between gap-10">
        <Image src={Logo} alt="logo" className="w-26.75 object-cover cursor-pointer" />
        <button className={`hidden md:block text-gray-600 text-md-regular ${HOVER_GREEN}`}>
          위키목록
        </button>
        <button className={`hidden md:block text-gray-600 text-md-regular ${HOVER_GREEN}`}>
          자유게시판
        </button>
      </div>
      <div>
        <div className="hidden md:flex items-center">
          {!isLoggedIn && (
            <button
              onClick={() => setLoggedIn(true)} //임시 로그인 완료
              className={`text-gray-400 text-md-regular ${HOVER_GREEN}`}
            >
              로그인
            </button>
          )}
          {isLoggedIn && (
            <div className=" flex justify-center items-center gap-6">
              <BellIcon className={`text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`} />
              <UserIcon className={`text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`} />
            </div>
          )}
        </div>
        <MenuIcon
          className={`md:hidden block text-gray-400 cursor-pointer text-md-regular ${HOVER_GREEN}`}
        />
      </div>
    </div>
  );
}

export default Navbar;
