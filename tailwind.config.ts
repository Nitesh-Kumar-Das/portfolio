import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:            'var(--void)',
        'deep-space':    'var(--deep-space)',
        'aurora-cyan':   'var(--aurora-cyan)',
        'aurora-teal':   'var(--aurora-teal)',
        'nebula-violet': 'var(--nebula-violet)',
        stardust:        'var(--stardust)',
        'stellar-white': 'var(--stellar-white)',
        pulsar:          'var(--pulsar)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
