import localFont from 'next/font/local';

export const nexonGothic = localFont({
  src: [
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTFLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTF.otf', // 일반형
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTFBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nexon', // Tailwind 변수명
  display: 'swap',
});