/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/*'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

