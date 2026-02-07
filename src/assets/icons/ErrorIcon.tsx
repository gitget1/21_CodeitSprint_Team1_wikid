import React from 'react';

import { cn } from '@/lib/utils';

export const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('shrink-0 w-5 h-5', className)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" className="fill-secondary-red-200" />
    <rect x="9" y="5" width="2" height="6" rx="1" fill="white" />
    <circle cx="10" cy="14" r="1" fill="white" />
  </svg>
);
