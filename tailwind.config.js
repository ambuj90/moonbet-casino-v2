// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Custom Casino theme colors
        'casino-dark': '#0B0B0B',
        'casino-gold': '#FFD700',
        'casino-gray': '#1A1A1A',
        'casino-green': '#00FFB3',
      },
    },
  },
  plugins: [],
}
