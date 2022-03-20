module.exports = {
  content: [
    './src/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {center: true},
    extend: {
      colors: {
        primary: '#1e4848',
        "primary-a10": '#1e484810',
        "primary-a60": '#1e484860',
        "primary-a80": '#1e484880',
        gray: {100: '#f0eeea'},
        "gray-a10": '#f0eeea10',
        "gray-a60": '#f0eeea60',
        "gray-a80": '#f0eeea80',
      },
      spacing: {
        col: "1.2rem"
      }
    },
  },
  plugins: [
    require('postcss-import'),
    require('postcss-color-function'),
    require('tailwindcss'),
    require('autoprefixer'),
    function ({addComponents}) {
      addComponents({
        '.container': {
          maxWidth: 'min(88%, 70rem)'
        }
      })
    }
  ],
}