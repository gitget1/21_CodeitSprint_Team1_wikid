import { SVGProps } from 'react';

type IconName = 'bold' | 'align' | 'bullet' | 'image' | 'italic' | 'number' | 'underline' | 'link';

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 24, ...props }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      {iconPath[name]}
    </svg>
  );
}

const iconPath: Record<IconName, React.ReactNode> = {
  bold: <path d="M6 4h6a4 4 0 010 8H6z M6 12h7a4 4 0 010 8H6z" fill="currentColor" />,

  italic: <path d="M10 4h8M6 20h8M14 4L10 20" stroke="currentColor" strokeWidth="1" />,

  underline: (
    <>
      <path d="M6 4v6a6 6 0 0012 0V4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="2" />
    </>
  ),

  bullet: (
    <>
      <circle cx="5" cy="6" r="2" fill="currentColor" />
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="5" cy="18" r="2" fill="currentColor" />
      <path d="M10 6h10M10 12h10M10 18h10" stroke="currentColor" strokeWidth="2" />
    </>
  ),

  number: (
    <>
      <path d="M4 6h2v4H4zM4 14h2v4H4z" fill="currentColor" />
      <path d="M10 6h10M10 12h10M10 18h10" stroke="currentColor" strokeWidth="2" />
    </>
  ),

  align: (
    <>
      <path d="M4 6h16M8 12h8M4 18h16" stroke="currentColor" strokeWidth="2" />
    </>
  ),

  link: (
    <>
      <path d="M10 14l4-4" stroke="currentColor" strokeWidth="2" />
      <path d="M7 17a4 4 0 010-6l2-2" stroke="currentColor" strokeWidth="2" />
      <path d="M17 7a4 4 0 010 6l-2 2" stroke="currentColor" strokeWidth="2" />
    </>
  ),

  image: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="10" r="2" fill="currentColor" />
      <path d="M21 17l-5-5-7 7" stroke="currentColor" strokeWidth="2" />
    </>
  ),
};
