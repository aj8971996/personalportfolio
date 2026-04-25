/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#09090B',
        'bg-surface':  '#111117',
        'bg-raised':   '#18181F',
        'accent-primary': '#6366F1',
        'accent-bright':  '#818CF8',
        'accent-dim':     '#4F46E5',
        'accent-amber':   '#F59E0B',
        'accent-cyan':    '#06B6D4',
        'text-primary':   '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted':     '#475569',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.65s ease backwards',
        'fade-in':    'fadeIn 0.5s ease backwards',
        'blink':      'blink 1s step-end infinite',
        'slide-down': 'slideDown 0.25s ease forwards',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    }
  },
  plugins: []
}
