import { Skeleton } from ".";

interface FormInputSkeletonProps {
  showLabel?: boolean;
}

export default function FormInputSkeleton({ showLabel = true }: FormInputSkeletonProps) {
  return (
    <div className="flex flex-col">
      {showLabel && <Skeleton className="h-5 w-20 mb-2.5" />}
      <Skeleton className="h-[45px] w-full rounded-[10px]" />

    </div>
  );
}