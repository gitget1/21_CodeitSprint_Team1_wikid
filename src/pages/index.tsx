import { nexonGothic } from '@/styles/nexonfont';

export default function Home() {
  return (
    <div className={`${nexonGothic.variable} font-nexon w-full h-82.25 md:h-122 lg:h-142 bg-gray-500`}>
      <span className="font-bold">나만의 위키 만들어 보기</span>
    </div>
  )
}
