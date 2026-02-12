import Image from 'next/image';
import { nexonGothic } from '@/styles/nexonfont';

import megaphone from '@/assets/images/shareMegaphone.png';
import logoW from '@/assets/images/shareLogoW.png';
import mobileUpdate from '@/assets/images/shareMobileUpdate.png';
import messageBubble from '@/assets/images/shareMessageBubble.png';

export default function ShareSection() {
  return (
    <section className={`
        ${nexonGothic.variable}
        bg-[#f1f4fd]
        w-full flex justify-center flex-col items-center
        
        py-[100px] md:py-[160px] 
        lg:py-[200px]
        
      `}
      style={{ fontFamily: nexonGothic.style.fontFamily }}>
      <div className="w-full max-w-[924px] text-right px-5 md:px-12">
        <span className="block text-primary-green-200 font-bold uppercase
        text-[10px] mb-[10px]
        md:text-[20px] md:mb-[32px]
        lg:text-[30px] lg:mb-[20px]
        ">
          Share
        </span>
        <h2 className="text-gray-500 text-[16px] md:text-[32px] lg:text-[50px] leading-[1.2] lg:mb-[120px] md:mb-[80px] mb-[40px]">
          내 위키 만들고<br />
          친구에게 공유해요
        </h2>
      </div>
    

      <div className='w-full flex lg:gap-[35px] md:gap-[20px] gap-[10px] justify-between overflow-hidden items-stretch'> 
  
        <div className='bg-[#DEE5F5] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] lg:rounded-l-none md:rounded-l-none rounded-l-none flex-[0.3] shrink-0'></div>

        
        <div className='bg-[#B2A5FD] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] aspect-square flex-1 max-w-[360px] relative'>
          <Image src={megaphone} alt="megaphone" fill sizes="360px" className="object-contain" priority />
        </div>
        <div className='bg-[#ADEDDE] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] aspect-square flex-1 max-w-[360px] relative'>
          <Image src={logoW} alt="logoW" fill sizes="360px" className="object-contain" priority />
        </div>
        <div className='bg-[#DEE5F5] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] aspect-square flex-1 max-w-[360px] relative'>
          <Image src={mobileUpdate} alt="mobileUpdate" fill sizes="360px" className="object-contain" priority />
        </div>
        <div className='bg-[#DEE5F5] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] aspect-square flex-1 max-w-[360px] relative'>
          <Image src={messageBubble} alt="messageBubble" fill sizes="360px" className="object-contain" priority />
        </div>

        {/* 오른쪽 잘린 배경 */}
        <div className='bg-[#DEE5F5] lg:rounded-[25px] md:rounded-[15px] rounded-[10px] lg:rounded-r-none md:rounded-r-none rounded-r-none flex-[0.3] shrink-0'></div>
      </div>
    </section>
  )
}