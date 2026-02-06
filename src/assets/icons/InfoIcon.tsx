import React from 'react';

import { cn } from '@/lib/utils';

export const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('shrink-0 w-5 h-5', className)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="10" cy="6" r="1" fill="currentColor" />
    <rect x="9" y="9" width="2" height="6" rx="1" fill="currentColor" />
  </svg>
);
