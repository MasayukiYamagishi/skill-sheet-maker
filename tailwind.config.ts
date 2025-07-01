import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        background: 'rgb(var(--background) / <alpha-value>)',
      },
      textColor: {
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
      },
      colors: {
        gray: 'var(--gray)',
        black: 'var(--black)',
        white: 'var(--white)',
      },
      fontFamily: {
        // "font-sans" を上書き
        sans: ['Inter', 'Noto Sans JP', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [require('daisyui')],
};

export default config;
