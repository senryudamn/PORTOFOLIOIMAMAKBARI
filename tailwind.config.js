/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gravity Falls palette
        parchment: {
          DEFAULT: '#e8dcb8',
          50: '#f5f0e1',
          100: '#f0e9d6',
          200: '#e8dcb8',
          300: '#d4c4a0',
          400: '#c0a878',
          500: '#a88c50',
        },
        crimson: {
          DEFAULT: '#8B0000',
          light: '#DC143C',
          dark: '#5c0000',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#C9A800',
        },
        journal: {
          1: '#8B0000', // Deep crimson for Journal 1
          2: '#1a3a5c', // Deep blue for Journal 2
          3: '#2d1b4e', // Deep purple for Journal 3
        },
        blacklight: {
          cyan: '#00FFFF',
          magenta: '#FF00FF',
        },
        // Monochrome ramp (keeping for compatibility)
        ink: {
          950: '#050505',
          900: '#0a0a0b',
          850: '#101012',
          800: '#161618',
          700: '#1f1f22',
          600: '#2a2a2e',
          500: '#3a3a40',
          400: '#52525b',
        },
        ash: {
          300: '#71717a',
          200: '#a1a1aa',
          100: '#d4d4d8',
          50: '#f4f4f5',
        },
        platinum: '#e4e4e7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        typewriter: ['"Special Elite"', '"Courier Prime"', 'monospace'],
        cryptic: ['"Cinzel Decorative"', 'serif'],
      },
      backgroundImage: {
        'paper-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'paper':
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'paper-lg':
          '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
        'glow-cyan':
          '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
        'glow-magenta':
          '0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(255,0,255,0.3)',
        'glow-gold':
          '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        'float-anomaly': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(100px, -50px) rotate(90deg)' },
          '50%': { transform: 'translate(-50px, -100px) rotate(180deg)' },
          '75%': { transform: 'translate(50px, -50px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.3', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        'bill-glitch': {
          '0%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '10%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(90deg)' },
          '20%': { transform: 'translate(2px, -2px)', filter: 'hue-rotate(180deg)' },
          '30%': { transform: 'translate(-2px, -2px)', filter: 'hue-rotate(270deg)' },
          '40%': { transform: 'translate(2px, 2px)', filter: 'hue-rotate(360deg)' },
          '50%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        typewriter: {
          '0%,100%': { width: '0' },
          '50%': { width: '100%' },
        },
        'blink-caret': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'needle-shake': {
          '0%,100%': { transform: 'rotate(var(--needle-angle))' },
          '25%': { transform: 'rotate(calc(var(--needle-angle) - 2deg))' },
          '75%': { transform: 'rotate(calc(var(--needle-angle) + 2deg))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-anomaly': 'float-anomaly 30s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'bill-glitch': 'bill-glitch 0.5s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
        'blink-caret': 'blink-caret 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
