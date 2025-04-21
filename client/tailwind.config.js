/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme:{
    extend: {
      keyframes: {
        'border-spin': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
        'bounce-spin': 'border-spin 4s linear infinite, bounce 2s infinite',
      },
    },
  },
  plugins: [],
}