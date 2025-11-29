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
        },
        jiosaavn: {
          darker: '#0C0C0C', // Placeholder, adjust as needed
          card: '#1C1C1C',   // Placeholder, adjust as needed
          gray: '#333333',   // Placeholder, adjust as needed
          green: '#20BC70',  // Placeholder, adjust as needed
        }
      }
    },
  },
  plugins: [],
}
