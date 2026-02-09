import { nexonGothic } from "@/styles/nexonfont";
import viewMainCard from '@/assets/images/viewMainCard.png';
import viewBellIcon from '@/assets/images/viewBellIcon.png';
import viewNotificationList from '@/assets/images/viewNotificationList.png';


export default function ViewSection() {
  return (
    <section
      className={`
        ${nexonGothic.variable}
        w-full bg-[#ECF0FA]
    flex flex-col items-center
    px-5 md:px-12
    py-[100px] md:py-[160px] lg:py-[200px]
      `}
      style={{ fontFamily: nexonGothic.style.fontFamily }}
    >
      {/* 타이틀 */}
      <div className="w-full max-w-[924px] mb-10 md:mb-20 lg:mb-30">
        <span className="block text-primary-green-200 font-bold text-[10px] md:text-[20px] lg:text-[30px]">
          VIEW
        </span>
        <h2 className="mt-[10px] md:mt-5 text-gray-500 text-[16px] md:text-[32px] lg:text-[50px]">
          친구들이 달아준 내용을<br />
          확인해 봐요
        </h2>
      </div>

      {/* 컨텐츠 */}
      <div className="w-full max-w-[924px] flex flex-col items-center">
        {/* 메인 카드 */}
        <div className="w-full mb-[10px] md:mb-[22px] lg:mb-10">
          <img
            src={viewMainCard.src}
            alt="View 메인 카드"
            className="w-full h-auto"
          />
        </div>

        {/* 하단 알림 영역 */}
        <div className="flex w-full gap-[10px] md:gap-[20px] mt-4 md:mt-8 items-stretch">
          {/* 알람 아이콘 - 항상 정사각형 */}
          <div
            className="
              flex-[1]
              aspect-square
              bg-secondary-purple-100
              rounded-[10px]
              flex items-center justify-center
              overflow-hidden
            "
          >
            <img
              src={viewBellIcon.src}
              alt="알림 아이콘"
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* 알람 메시지 - 자유 높이 (아이콘에 맞춰 늘어남) */}
          <div
            className="
              flex-[2]
              rounded-[10px]
              overflow-hidden
              shadow-sm
              flex
              items-center
            "
          >
            <img
              src={viewNotificationList.src}
              alt="알림 메시지"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
