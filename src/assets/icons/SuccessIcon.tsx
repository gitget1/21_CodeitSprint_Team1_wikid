import React from 'react';

import { cn } from '@/lib/utils';

export const SuccessIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('shrink-0 w-5 h-5', className)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" className="fill-primary-green-200" />
    <path
      d="M6 10L9 13L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
