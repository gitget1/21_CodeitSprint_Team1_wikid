import localFont from 'next/font/local';

export const nexonGothic = localFont({
  src: [
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTFLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTF.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NEXONLv1GothicLowOTFBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nexon',
  // 아래 설정을 추가하여 CSS 변수가 가리키는 실제 폰트명을 'nexonGothic'으로 고정합니다.
  adjustFontFallback: 'Arial',
  display: 'swap',
});
