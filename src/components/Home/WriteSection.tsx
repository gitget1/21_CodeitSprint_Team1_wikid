import Image from 'next/image';
import { nexonGothic } from '@/styles/nexonfont';

import writeKeyboard from '@/assets/images/writeKeyboard.png';
import writeTextCard from '@/assets/images/writeTextCard.png';

export default function WriteSection() {
  return (
    <section className={`
        ${nexonGothic.variable}
        bg-[#474D66]
        flex
        px-5 py-[100px]
        md:px-12 md:py-[160px] 
        lg:py-[200px]
        
      `}
      style={{ fontFamily: nexonGothic.style.fontFamily }}>

      {/* 왼쪽 & 오른쪽 이미지 감싼 div */}
      <div className='w-full flex  justify-center gap-[10px]
      md:gap-[20px] lg:gap-[40px]
      '>
        {/* 왼쪽 공간 */}
        <div className='flex flex-col'>
          <span className='text-[10px] mb-[10px]
          md:text-[20px] md:mb-[20px]
          lg:text-[30px] lg:mb-[20px]
          text-primary-green-200 font-bold uppercase
          '>Write</span>

          <h2 className='text-[16px] mb-[30px] 
          md:text-[32px] md:mb-[40px]
          lg:text-[50px] md:mb-[60px]
          text-white break-keep
          '>친구의 위키, <br />
          직접 작성해 봐요
          </h2>
          
          <div className='max-w-[133px] h-auto bg-primary-green-200 rounded-[10px]
          md:max-w-[262px] md:rounded-[15px]
          lg:max-w-[364px] md:rounded-[20px]
          '>
            <img src={writeKeyboard.src} alt="writeKeyboard" className='' />
          </div>
        </div>
        {/* 오른쪽 공간 */}
        <div className='max-w-[192px] h-auto bg-[#3b415b] items-center flex rounded-[10px]
        md:max-w-[365px] md:rounded-[15px]
        lg:max-w-[520px] lg:rounded-[20px]
        '>
          <img src={writeTextCard.src} alt="writeTextCard" />
        </div>
      </div>
    </section>
  );
}
