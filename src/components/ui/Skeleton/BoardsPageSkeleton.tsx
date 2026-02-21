import { Skeleton } from '@/components/ui/Skeleton/index';

export default function BoardsPageSkeleton() {
  return (
    <div className="mt-[60px] w-full px-3 md:max-w-[1200px] md:mx-auto md:px-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-[40px] w-[180px] rounded-md" />
        <Skeleton className="h-[45px] w-[140px] rounded-[10px]" />
      </div>

      <div className="mt-[60px] md:flex md:justify-center">
        <div className="overflow-hidden md:overflow-visible w-full">
          <div className="gap-4 mt-[60px] w-full flex md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[60px] flex flex-col md:flex-row w-full gap-3 md:gap-4">
        <div className="flex w-full gap-3">
          <div className="flex-1 min-w-0 w-fit">
            <Skeleton className="h-[45px] w-full rounded-[10px]" />
          </div>
          <Skeleton className="h-[45px] w-[80px] rounded-[10px]" />
        </div>
        <Skeleton className="h-[45px] w-[120px] rounded-[10px]" />
      </div>

      <div className="mt-[20px] md:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[80px] w-full mb-3 rounded-lg" />
        ))}
      </div>

      <div className="hidden md:block mt-[20px]">
        <Skeleton className="h-[49px] w-full rounded-md" />

        <div className="mt-2 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[49px] w-full rounded-md" />
          ))}
        </div>
      </div>

      <div className="mt-[60px] mb-[100px] flex justify-center">
        <Skeleton className="h-[40px] w-[280px] rounded-md" />
      </div>
    </div>
  );
}
