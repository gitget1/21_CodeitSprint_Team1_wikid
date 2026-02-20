import { Skeleton } from "./index";

export const WikiCardSkeleton = () => {
  return (
    <div className="w-full lg:h-[142px] md:h-[142px] h-auto bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] lg:rounded-[10px] md:rounded-[10px] rounded-[14px] overflow-hidden">
      <div className="lg:px-9 md:px-9 px-[25px] lg:py-6 md:py-6 py-[21px] flex lg:gap-[35px] md:gap-[32px] gap-[20px] h-full">
        {/* Avatar Skeleton */}
        <Skeleton className="lg:w-[94px] lg:h-[94px] md:w-[94px] md:h-[94px] w-[60px] h-[60px] rounded-full" />

        <div className="flex flex-col md:flex-row flex-grow justify-between min-w-0">
          <div className="flex flex-col justify-center gap-2">
            {/* Name Skeleton */}
            <Skeleton className="h-7 w-24 lg:mb-[14px] md:mb-[14px]" />
            {/* Info Skeleton */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end mt-3 md:mt-0">
            {/* Link Box Skeleton */}
            <Skeleton className="lg:h-[34px] md:h-[34px] h-[30px] w-48 rounded-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};