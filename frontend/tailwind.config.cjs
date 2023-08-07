/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    safelist:
      [
        'animate-[fade-in-left_1s_ease-in-out]',
      ],
    fontFamily: {
      'body': ['Roboto', 'sans-serif'],
      'title': ['Outfit', 'sans-serif']
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out'
      }
    }
  },
  plugins: [],
}
