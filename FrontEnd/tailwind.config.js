/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#E60000',
      },
      fontFamily: {
        sourgummy: ['Sour Gummy', 'cursive'],
        roboto : ['Roboto']
      },
    },
  },
  plugins: [],
};
