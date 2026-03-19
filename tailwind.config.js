/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-trustworthy': {
          lighter: '#B2EBF2',
          light: '#80DEEA',
          main: '#4DD0E1',
          dark: '#26C6DA',
          darker: '#00BCD4'
        },
        'medighar': {
          primary: '#00BCD4',
          secondary: '#0f172a',
          surface: '#ffffff',
          body: '#475569'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
