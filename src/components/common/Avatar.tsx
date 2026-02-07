import Image from 'next/image';

import { cn } from '@/lib/utils';
import defaultAvatar from '@/assets/images/profile.png';

type AvatarSize = 'comment' | 'wikiCard' | 'wikiDetail';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, string> = {
  comment: 'w-10 h-10 md:w-[50px] md:h-[50px]',
  wikiCard: 'w-[60px] h-[60px] md:w-[85px] md:h-[85px]',
  wikiDetail: 'w-[62px] h-[62px] md:w-[71px] md:h-[71px] lg:w-50 lg:h-50',
};

export function Avatar({ src, alt = 'avatar', size, className }: AvatarProps) {
  // 문자열이 올바르게 들어왔는지 확인
  const hasImage = typeof src === 'string' && src.trim() !== '';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full bg-muted flex items-center justify-center shrink-0',
        sizeMap[size],
        className
      )}
    >
      <Image
        src={hasImage ? src : defaultAvatar}
        alt={alt}
        fill
        className="object-cover"
        priority={size === 'wikiDetail'} // size가 wikiDetail일 떄 우선순위 로딩을 적용해 LCP 경고를 없앤다.
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
