/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nithan: ['Nithan', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const lineClampUtilities = {};
      for (let i = 1; i <= 5; i++) {
        lineClampUtilities[`.line-clamp-${i}`] = {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': `${i}`,
          '-webkit-box-orient': 'vertical',
        };
      }
      addUtilities(lineClampUtilities, ['responsive', 'hover']);
    },
  ],
}

