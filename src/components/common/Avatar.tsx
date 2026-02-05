import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "comment" | "wikiCard" | "wikiDetail";

interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size: AvatarSize;
  className?: string;
}
const sizeMap: Record<AvatarSize, string> = {
  comment: "w-10 h-10 md:w-[50px] md:h-[50px]",
  wikiCard: "w-[60px] h-[60px] md:w-[85px] md:h-[85px]",
  wikiDetail:
    "w-[62px] h-[62px] md:w-[71px] md:h-[71px] lg:w-[200px] lg:h-[200px]",
};

function getInitial(name?: string) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

export function Avatar({
  src,
  name,
  alt = "avatar",
  size,
  className,
}: AvatarProps) {
  const hasImage = Boolean(src && src.trim() !== "");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-muted flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      {hasImage ? (
        <Image src={src!} alt={alt} fill className="object-cover" />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
          {getInitial(name)}
        </span>
      )}
    </div>
  );
}
