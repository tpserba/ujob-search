/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sand: ['Open Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brand-grey-1': '#dadce0',
        'brand-blue-1': '1967d2',
        'brand-green-1': '137333'
      }
    }
  },
  plugins: []
}
