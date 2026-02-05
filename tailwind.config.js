/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal': {
          700: '#0f766e',
          600: '#0d9488',
          500: '#14b8a6',
        }
      }
    },
  },
  plugins: [],
}
