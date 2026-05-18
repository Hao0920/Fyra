import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 20px 80px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        'dashboard-glow': 'radial-gradient(circle at top, rgba(96, 165, 250, 0.18), transparent 40%)',
      },
    },
  },
  plugins: [],
} satisfies Config
