import { Skeleton } from '@/components/ui/Skeleton/index';

export default function BoardDetailSkeleton() {
  return (
    <div className="w-full mx-auto max-w-4xl px-4 py-8">
      <div className="px-[30px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[10px]">
        <div className="flex justify-between pt-[40px] gap-4">
          <Skeleton className="h-[40px] w-[60%] rounded-md" />
          <div className="hidden md:flex gap-2">
            <Skeleton className="h-[40px] w-[90px] rounded-[10px]" />
            <Skeleton className="h-[40px] w-[90px] rounded-[10px]" />
          </div>
          <div className="flex gap-2 md:hidden">
            <Skeleton className="h-[36px] w-[36px] rounded-md" />
            <Skeleton className="h-[36px] w-[36px] rounded-md" />
          </div>
        </div>

        <div className="flex pt-[21px] justify-between pb-4 border-b border-[rgb(228_229_240)] lg:border-0 lg:pb-0">
          <div className="flex gap-2">
            <Skeleton className="h-[18px] w-[80px] rounded-md" />
            <Skeleton className="h-[18px] w-[90px] rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-[18px] w-[18px] rounded-sm" />
            <Skeleton className="h-[18px] w-[30px] rounded-md" />
          </div>
        </div>

        <div className="pt-[36px]">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        <div className="pt-[20px] pb-[30px] space-y-3">
          <Skeleton className="h-[16px] w-[95%] rounded-md" />
          <Skeleton className="h-[16px] w-[90%] rounded-md" />
          <Skeleton className="h-[16px] w-[85%] rounded-md" />
          <Skeleton className="h-[16px] w-[60%] rounded-md" />
        </div>
      </div>

      <div className="flex justify-center mt-[60px]">
        <Skeleton className="h-[40px] w-[120px] rounded-[10px]" />
      </div>

      <div className="flex items-center gap-2 mt-[60px]">
        <Skeleton className="h-[22px] w-[60px] rounded-md" />
        <Skeleton className="h-[22px] w-[30px] rounded-md" />
      </div>

      <div className="flex flex-col justify-between w-full h-[133px] rounded-[10px] bg-[rgb(247_247_250)] px-3 py-3 mt-[14px]">
        <Skeleton className="h-[60px] w-full rounded-md" />
        <div className="flex items-end justify-between">
          <Skeleton className="h-[18px] w-[80px] rounded-md" />
          <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
        </div>
      </div>

      <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border border-gray-100 rounded-[10px]">
            <div className="flex items-center gap-3">
              <Skeleton className="h-[32px] w-[32px] rounded-full" />
              <Skeleton className="h-[18px] w-[120px] rounded-md" />
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-[14px] w-[92%] rounded-md" />
              <Skeleton className="h-[14px] w-[75%] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
