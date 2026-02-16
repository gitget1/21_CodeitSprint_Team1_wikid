import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import heroMainVisual from '@/assets/images/heroMainVisual.png';
import { nexonGothic } from '@/styles/nexonfont';
import { useAuthStore } from '@/stores/auth.store';

export default function HeroSection() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = () => {
    if (!isLoaded) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.profile?.code) {
      router.push(`/wiki/${user.profile.code}`);
    } else {
      router.push('/mypage');
    }
  };

  return (
    <section
      className={`
        ${nexonGothic.variable}
        relative w-full overflow-hidden bg-[#f1f4fd]
      `}
      style={{ fontFamily: nexonGothic.style.fontFamily }}
    >
      {/* 곡선 배경 */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 left-1/2
          z-0
          h-44 w-[140%]
          -translate-x-1/2
          rounded-t-[100%]
          bg-[#474D66]
          "
      />

      {/* Hero 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 pt-[100px] md:pt-30 lg:pt-30">
        <h1 className="text-center text-gray-600 font-light lg:text-[60px] md:text-[60px] text-[40px]">
          남들이 만드는 <br />
          <span className="lg:text-[90px] font-bold md:text-[90px] text-[60px]">나만의 위키</span>
        </h1>

        <button
          onClick={handleClick}
          className="
            font-pretendard
            mx-auto mt-6
            flex items-center justify-center
            h-[44px] w-[140px]
            rounded-md
            bg-gray-600 text-gray-50
            text-xl-bold
            md:h-[59px] md:w-[170px]
            md:text-2xl-bold
          "
        >
          위키 만들기
        </button>

        <div className="relative mx-auto mt-12 w-[240px] md:w-[300px] lg:w-[360px] aspect-[360/420]">
          <Image
            src={heroMainVisual}
            alt="위키 예시 이미지"
            fill
            priority
            sizes="(max-width: 768px) 240px,
           (max-width: 1024px) 300px,
           360px"
          />
        </div>
      </div>
    </section>
  );
}
