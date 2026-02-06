import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * 위키드 Button variants
 * - variant: primary(민트), secondary(아웃라인)
 * - size: sm(44px), md(45px), lg(48px)
 */
const buttonVariants = cva(
  // 기본 스타일 (gap·border-radius는 size에서 오버라이드 가능)
  'inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-semibold transition-all focus-visible:outline-none disabled:cursor-not-allowed border border-transparent',
  {
    variants: {
      variant: {
        // Primary: 민트 배경 + 흰색 텍스트 (테두리 없음)
        primary:
          'bg-[#4CBFA4] text-white hover:bg-[#3AAA91] active:bg-[#32967F] disabled:bg-[#E4E5F0] disabled:text-white',
        // Secondary: 투명 배경 + 민트 테두리 + 민트 텍스트
        secondary:
          'bg-transparent border border-solid border-[#4CBFA4] text-[#4CBFA4] hover:bg-[#4CBFA4]/10 active:bg-[#4CBFA4]/20 disabled:border-[#4CBFA4] disabled:text-[#4CBFA4] disabled:bg-transparent',
      },
      size: {
        // 내 위키 만들기: 120×40, padding 11px 20px, gap 10px
        compact: 'h-[40px] w-[120px] py-[11px] px-5 gap-[10px] text-sm',
        // 로그인 1·2행: 400×45, padding 13px 175px, gap 10px
        loginWide: 'h-[45px] w-[400px] py-[13px] px-[175px] gap-[10px] text-sm',
        // 로그인 3행: 335×45, padding 13px 175px, gap 10px
        loginNarrow: 'h-[45px] w-[335px] py-[13px] px-[175px] gap-[10px] text-sm',
        // 편집 중: 160×45, padding 13px, gap 10px
        editing: 'h-[45px] w-[160px] py-[13px] px-5 gap-[10px] text-sm',
        sm: 'h-10 min-w-[120px] px-5 gap-2 text-sm',
        md: 'h-[45px] min-w-[120px] px-8 gap-2 text-sm',
        lg: 'h-12 min-w-[120px] px-10 gap-2 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

/**
 * 위키드 공통 Button 컴포넌트
 *
 * @example
 * <Button>내 위키 만들기</Button>
 * <Button variant="secondary">로그인</Button>
 * <Button isLoading>편집 중</Button>
 * <Button fullWidth size="lg">로그인</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-1">
            편집 중
            <span className="flex gap-[2px]">
              <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-current" />
            </span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
