import { nexonGothic } from '@/styles/nexonfont';

export default function ViewSection() {
  return (
    <div className="{`${nexonGothic.variable} flex w-full bg-[#ECF0FA] h-[1291px] py-50 justify-center items-center px-5`}"
    style={{ fontFamily: nexonGothic.style.fontFamily }}>
      {/* 타이틀 영역 */}
      <div className="flex-col mb-30">
        <span className="black text-primary-green-200 font-bold text-[30px]">VIEW</span>
        <h2 className='black text-gray-500 text-[50px] mt-5'>친구들이 달아준내용을<br /> 확인해 봐요</h2>
      </div>
      {/* 하단 컨텐츠 영역 */}
      <div>
        {/* 초록색 박스 */}
        <div>
          <img src="" alt="" />
        </div>
      </div>

    </div>
  );
}