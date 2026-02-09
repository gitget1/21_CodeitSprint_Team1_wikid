import { nexonGothic } from '@/styles/nexonfont';

export default function CtaSection() {
  return (
    <div
      className={`${nexonGothic.variable} flex flex-col justify-center items-center w-full lg:h-[568x] md:h-[488px]  h-[329px] md:h-122 lg:h-142 bg-gray-500`}
      // nexonGothic.style.fontFamily에는 Next.js가 빌드한 실제 폰트 이름이 담겨 있습니다.
      style={{ fontFamily: nexonGothic.style.fontFamily }}
    >
      <span className="font-bold text-white text-[30px] md:text-[60px] flex justify-center">
        나만의 위키 만들어 보기
      </span>
      <button className="font-pretendard flex items-center justify-center w-[169px] h-[54px] md:w-[190px] md:h-[59px] py-[15px] px-[30px] rounded-[15px] bg-white mt-10 text-gray-500 text-xl-bold md:text-2xl-bold">
        지금 시작하기
      </button>
    </div>
  );
}
