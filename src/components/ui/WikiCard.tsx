import React from 'react';
import Image from 'next/image';
import DefaultProfile from '@/assets/images/profile.png';
import LinkIcon from '@/assets/icons/LinkIcon.svg';

type WikiCardProps = {
  name: string;
  location: string;
  job: string;
  wikiUrl: string;
  profileImage?: string;
};

const WikiCard = ({ name, location, job, wikiUrl, profileImage }: WikiCardProps) => {
  return (
    <div className='w-full lg:h-[142px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]'></div>


    // w-full을 추가하여 가로로 꽉 차게 만듭니다.
    // <div className="flex items-center w-full p-6 md:p-10 bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] gap-6 md:gap-10 hover:translate-y-[-2px] transition-all cursor-pointer">
      
      {/* 프로필 이미지 */}
      {/* <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] relative flex-shrink-0 overflow-hidden rounded-full border border-[#DDDDE3]">
        <Image
          src={profileImage || DefaultProfile}
          alt={`${name} 프로필`}
          fill
          className="object-cover"
        />
      </div> */}

      {/* 정보 영역: flex-grow로 남은 공간을 다 차지하게 함 */}
      {/* <div className="flex flex-col flex-grow gap-1 md:gap-2">
        <h3 className="text-[20px] md:text-[32px] font-bold text-[#111111]">{name || '이름 없음'}</h3>
        <div className="text-[14px] md:text-[18px] text-[#8F95B2] leading-relaxed">
          <p>{location || '지역 정보 없음'}</p>
          <p>{job || '소속 정보 없음'}</p>
        </div>
      </div> */}

      {/* 링크 버튼: PC에서만 보임 */}
      {/* <div className="hidden md:flex items-center gap-2 px-5 py-3 bg-[#F7F7FA] rounded-[10px] text-[#3ABF91] border border-[#DDDDE3]">
        <LinkIcon className="w-5 h-5" />
        <span className="text-[16px] font-medium">{wikiUrl || 'https://www.wikied.kr/link'}</span>
      </div>
    </div> */}
  );
};

export default WikiCard;