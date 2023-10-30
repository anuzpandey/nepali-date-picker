/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    mode: 'jit',
    theme: {
        extend: {
            maxWidth: {
                '8xl': '90rem',
                ...defaultTheme.maxWidth
            },
            animation: {
                'spin-slow': 'spin 5s linear infinite',
                border: 'border 4s ease infinite',
            },
            keyframes: {
                border: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
