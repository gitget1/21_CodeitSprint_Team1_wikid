/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 메인 랜딩페이지에서 사용하는 넥슨고딕폰트
      fontFamily: {
        nexon: ['var(--font-nexon)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
