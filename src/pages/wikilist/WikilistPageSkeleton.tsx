import { WikiCardSkeleton } from "@/components/ui/Skeleton/WikiCardSkeleton";

export default function WikilistPageSkeleton() {
  return (
    <section className="min-h-screen bg-white pb-20 w-full">
      <div className="lg:max-w-[860px] md:max-w-[704px] max-w-[335px] lg:mt-20 md:mt-15 mt-10 mx-auto">
        {/* Searchbar Skeleton */}
        <div className="w-full h-[45px] bg-gray-100 animate-pulse rounded-lg mb-10" />

        {/* List Skeleton */}
        <div className="flex flex-col lg:gap-6 md:gap-6 gap-2">
          {/* PAGE_SIZE인 3개만큼 반복 노출 */}
          {[1, 2, 3].map((i) => (
            <WikiCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}