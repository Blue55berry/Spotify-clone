/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          dark: '#121212',
          darker: '#0f0f0f',
          green: '#1DB954',
          gray: '#282828',
        }
      }
    },
  },
  plugins: [],
}
