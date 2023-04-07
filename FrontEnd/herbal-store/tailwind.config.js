/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#6F9940',
        secondary: '#4C9231',
        tertiary: '#386B25',
        primarylight: '#7CCB5E',
        primarydark: '#254519',
        darkbg: '#111827',
        lightbg: '#1F2937',
      },
      width: {
        50: '12.5rem',
        80: '20rem',
        102: '26rem',
        100: '25rem',
        120: '30rem',
      },
      height: {
        25: '6.25rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
