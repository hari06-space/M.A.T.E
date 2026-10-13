/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mate: {
          orange: '#FF5E36',
          orangeHover: '#E54E28',
          magenta: '#E0287D',
          purple: '#6C2EB9',
          purpleDark: '#4A154B',
          navy: '#0E1326',
          navyLight: '#181F38',
          cardDark: '#12182E',
          cardBorder: '#232D4F'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 94, 54, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(108, 46, 185, 0.4)',
      }
    },
  },
  plugins: [],
}
