import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * 위키드 Button variants
 * - variant: primary(민트), secondary(아웃라인)
 * - size: sm(44px), md(45px), lg(48px)
 */
const buttonVariants = cva(
  // 기본 스타일
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold transition-all focus-visible:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Primary: 민트 배경 + 흰색 텍스트
        primary:
          'bg-[#4CBFA4] text-white hover:bg-[#3AAA91] active:bg-[#32967F] disabled:bg-[#E4E5F0] disabled:text-white',
        // Secondary: 투명 배경 + 민트 테두리 + 민트 텍스트
        secondary:
          'bg-transparent border border-[#4CBFA4] text-[#4CBFA4] hover:bg-[#4CBFA4]/10 active:bg-[#4CBFA4]/20 disabled:border-[#E4E5F0] disabled:text-[#8F95B2] disabled:bg-transparent',
      },
      size: {
        sm: 'h-10 min-w-[120px] px-5 text-sm',
        md: 'h-[45px] min-w-[400px] px-8 text-sm',
        lg: 'h-12 min-w-[400px] px-10 text-base',
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
