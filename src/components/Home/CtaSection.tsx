import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/auth.store';
import { nexonGothic } from '@/styles/nexonfont';

export default function CtaSection() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = () => {
    // 하이드레이션 완료 전 클릭 방지
    if (!isLoaded) return;

    // 1. 로그아웃 상태 (user가 없음)
    if (!user) {
      router.push('/login');
      return;
    }

    // 2. 로그인 상태 + 프로필 코드 존재 여부에 따른 분기
    if (user.profile?.code) {
      // 프로필 있음 -> 위키 페이지로
      router.push(`/wiki/${user.profile.code}`);
    } else {
      // 프로필 없음 -> 마이페이지(프로필 생성)로
      router.push('/mypage');
    }
  };
  return (
    <div
      className={`${nexonGothic.variable} flex flex-col justify-center items-center w-full lg:h-[568px] md:h-[488px]  h-[329px] md:h-122 lg:h-142 bg-gray-500`}
      // nexonGothic.style.fontFamily에는 Next.js가 빌드한 실제 폰트 이름이 담겨 있습니다.
      style={{ fontFamily: nexonGothic.style.fontFamily }}
    >
      <span className="font-bold text-white text-[30px] md:text-[60px] flex justify-center">
        나만의 위키 만들어 보기
      </span>
      <button onClick={handleClick} className="font-pretendard flex items-center justify-center w-[169px] h-[54px] md:w-[190px] md:h-[59px] py-[15px] px-[30px] rounded-[15px] bg-white mt-10 text-gray-500 text-xl-bold md:text-2xl-bold">
        지금 시작하기
      </button>
    </div>
  );
}
