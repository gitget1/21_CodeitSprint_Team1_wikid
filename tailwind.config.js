/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // globals.css @theme와 1:1 매핑
      colors: {
        gray: {
          50: '#ffffff',
          100: '#f7f7f7',
          200: '#e4e5f0',
          300: '#c6cada',
          400: '#8f95b2',
          500: '#474d66',
          600: '#3b415b',
        },
        'primary-green': {
          100: '#eef9f6',
          200: '#4cbfa4',
          300: '#32a68a',
        },
        'secondary-red': {
          100: '#fbeded',
          200: '#d14343',
        },
        'secondary-purple': {
          100: '#8e66ff',
        },
        'secondary-yellow': {
          100: '#fdd181',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', 'Pretendard', '-apple-system', 'sans-serif'],
        nexon: ['var(--font-nexon)', 'sans-serif'],
      },
      screens: {
        sm: '375px',
        md: '744px',
        lg: '1024px',
        xl: '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
