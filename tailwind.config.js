/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Monochrome ramp: deep black -> platinum white
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
        charcoal: '#18181b',
        slate1: '#27272a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'mono-glow': '0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px rgba(255,255,255,0.18)',
        'mono-soft': '0 12px 40px -16px rgba(0,0,0,0.6)',
        'lift': '0 30px 60px -30px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-mono':
          'radial-gradient(circle at 50% -10%, rgba(255,255,255,0.05), transparent 55%)',
        'hero-fade':
          'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,255,255,0.06), transparent), radial-gradient(ellipse 60% 50% at 85% 100%, rgba(255,255,255,0.03), transparent)',
        'ridge':
          'linear-gradient(180deg, transparent 0%, #050505 92%)',
        'summit':
          'linear-gradient(180deg, #0a0a0b 0%, #050505 100%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-dim': {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
        'drift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'twinkle': {
          '0%,100%': { opacity: '0.05', transform: 'scale(0.8)' },
          '50%': { opacity: '0.15', transform: 'scale(1.1)' },
        },
        'pan-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-dim': 'pulse-dim 5s ease-in-out infinite',
        drift: 'drift 60s linear infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'pan-slow': 'pan-slow 120s linear infinite',
      },
    },
  },
  plugins: [],
};
