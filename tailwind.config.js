/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./cortado-desktop/src/index.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}