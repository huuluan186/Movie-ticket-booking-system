/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      './public/index.html'
    ],
    theme: {
      extend: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
          },
        width: {
          '1100': '1100px'
        },
        backgroundColor: {
          primary: '#F9FBFD',
          secondary1: '#1266dd',
          secondary2: '#D61117',
          'overlay-30': 'rgba(0,0,0,0.3)',
          'overlay-70': 'rgba(0,0,0,0.7)',
        },
        backgroundImage:{
            login:"url('./assets/background-signin-signup.jpg')",
        },
        maxWidth: {
          '600': '600px',
            '500': '500px',
          '1100': '1100px'
        },
        minWidth: {
          '300': '300px',
          '200': '200px'
        },
        cursor: {
          pointer: 'pointer'
        },
        flex: {
          '3': '3 3 0%'
        }
      },
    },
    plugins: [],
  }