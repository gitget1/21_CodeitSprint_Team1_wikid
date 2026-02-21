import { cn } from "@/lib/utils";
import { Skeleton } from ".";

interface ButtonSkeletonProps {
  size?: 'compact' | 'loginWide' | 'loginNarrow' | 'editing' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function ButtonSkeleton({ size = 'md', fullWidth, className }: ButtonSkeletonProps) {
  const sizeClasses = {
    compact: "h-[40px] w-[120px]",
    loginWide: "h-[45px] w-[400px]",
    loginNarrow: "h-[45px] w-[335px]",
    editing: "h-[45px] w-[160px]",
    sm: "h-10 w-[120px]",
    md: "h-[45px] w-[120px]",
    lg: "h-12 w-[120px]",
  };

  return (
    <Skeleton
      className={cn(
        "rounded-[10px]",
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    />
  );
}