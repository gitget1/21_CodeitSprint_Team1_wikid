import React from 'react';
import Link from 'next/link';
import { Avatar } from '../common/Avatar';
import LinkIcon from '@/assets/icons/LinkIcon.svg';

type WikiCardProps = {
  name: string;
  location: string;
  job: string;
  wikiUrl: string;
  profileImage?: string;
  priority?: boolean;
};

const WikiCard = ({ name, location, job, wikiUrl, profileImage }: WikiCardProps) => {
  // 실제 브라우저에 표시될 전체 URL (필요 시 도메인 추가 가능)
  const displayUrl = `https://www.wikied.kr${wikiUrl}`;

  return (
    <Link 
      href={wikiUrl} 
      className='block w-full lg:h-[142px] md:h-[142px] h-auto bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] lg:rounded-[10px] md:rounded-[10px] rounded-[14px] overflow-hidden hover:shadow-[0_4px_25px_rgba(0,0,0,0.12)] transition-shadow duration-200'>
      <div className='lg:px-9 md:px-9 px-[25px] lg:py-6 md:py-6 py-[21px] flex lg:gap-[35px] md:gap-[32px] gap-[20px] h-full'>
        
        <Avatar size="wikiCard" src={profileImage} alt={`${name}의 프로필`} />

        <div className='flex flex-col md:flex-row flex-grow justify-between min-w-0'>
          {/* 왼쪽: 이름 및 정보 섹션 */}
          <div className='flex flex-col justify-center'>
            <h2 className='text-2xl-semibold text-gray-500 lg:pb-[14px] md:pb-[14px] pb-[6px] text-[20px]'>
              {name}
            </h2>
            <div className='flex flex-col'>
              <span className='text-[12px] md:text-[14px] text-gray-400 font-normal leading-5'>
                {location}
              </span>
              <span className='text-[12px] md:text-[14px] text-gray-400 font-normal leading-5'>
                {job}
              </span>
            </div>
          </div>

          {/* 오른쪽: 링크 박스 섹션 */}
          <div className='flex flex-col justify-end items-start md:items-end mt-3 md:mt-0 min-w-0'>
            <div className='lg:h-[34px] md:h-[34px] h-[30px] rounded-[10px] px-[10px] py-[5px] bg-primary-green-100 
                            w-full max-w-[240px] min-w-0 flex-shrink-0'>
              <div className='flex w-full h-full items-center gap-1.5'>
                <LinkIcon className="w-4 h-4 text-primary-green-200 flex-shrink-0" />
                <span className='lg:text-[14px] md:text-[14px] text-[12px] font-normal text-primary-green-200 truncate'>
                  {displayUrl}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WikiCard;