/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'body': '#001e2b',
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
      },
      textColor: {
        'gold': '#E8C91B',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    function ({ addComponents }) {
      addComponents({
        '.common-class': {
          '@apply border border-slate-400 bg-slate-800 p-2.5 sm:p-3.5 rounded-lg text-white font-normal font-bold cursor-pointer overflow-hidden grid place-items-center': {},
        },
        '.group:hover': {
          '@apply border-slate-600 text-slate-300': {},
        },
      });
    },
  ],
};
