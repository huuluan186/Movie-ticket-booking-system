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
            secondary: '#4682B4',
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
        },
        keyframes: {
            'icon-appear': {
                '0%': {
                    opacity: '0',
                    transform: 'scale(0.5) rotate(0deg)',
                },
                '100%': {
                    opacity: '1',
                    transform: 'scale(1) rotate(360deg)',
                },
            },
            'slide-down': {
                from: {opacity: '0'},
                to: { opacity: '1',},
            },
            'slide-up': {
                from: {opacity: '1'},
                to: { opacity: '0',},
            },
        },
        animation: {
            'icon-appear': 'icon-appear 0.6s ease-out forwards',
            'slide-down': 'slide-down 0.2s ease-out forwards',
            'slide-up': 'slide-up 0.2s ease-out forwards',
        },
      },
    },
    plugins: [],
}