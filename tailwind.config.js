/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // INK = navy/dark blue (was dark grey)
        ink: {
          50:  '#f5f8fa',
          100: '#e8edf2',
          200: '#cfd9e3',
          300: '#aab8c5',
          400: '#7d8e9f',
          500: '#5a6b7c',
          600: '#3d4d5e',
          700: '#2c3e50',
          800: '#1a2940',
          900: '#0f1729',
          950: '#0a1628',
        },
        // GOLD = blue (legacy class names mapped to brand blue)
        gold: {
          50:  '#f4f8fd',
          100: '#e8f1fb',
          200: '#bbdefb',
          300: '#90caf9',
          400: '#4a90e2',
          500: '#1e88e5',
          600: '#1976d2',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#0a2f6f',
        },
        // Brand-specific blue palette
        navy: {
          50:  '#f4f8fd',
          100: '#e8f1fb',
          300: '#90caf9',
          500: '#1e88e5',
          700: '#1565c0',
          800: '#143461',
          900: '#0f2444',
          950: '#0a1628',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"','Georgia','serif'],
        body: ['"Inter"','system-ui','sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.33, 1, 0.68, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
        'spin-slow': 'spin 30s linear infinite',
        'scroll-line': 'scrollLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(60px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: 0, transform: 'scale(0.94)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        kenBurns: { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.1) translate(-2%,-1%)' } },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
}
