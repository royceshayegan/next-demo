import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // presets: [
  //   require('./node_modules/wind92/preset'),
  // ],
  theme: {
    fontFamily: {
			sans: ['w95fa', 'sans-serif']
		},
    extend: {
      colors: {
        'wallpaper': 'var(--wallpaper-color)',
        'neutral': 'var(--neutral)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'on-neutral': 'var(--on-neutral)',
        'on-primary': 'var(--on-primary)',
        'on-secondary': 'var(--on-secondary)',
        'on-tertiary': 'var(--on-tertiary)',
        'on-accent': 'var(--on-accent)',
        'error': 'var(--error)',
        'on-error': 'var(--on-error)',
        // 'surface-window': 'var(--surface-window)',
        // 'on-surface-window': 'var(--on-surface-window)',
        // 'surface-navbar': 'var(--surface-navbar)',
        // 'on-surface-navbar': 'var(--on-surface-navbar)',
      },
      backgroundImage: {
        'wallpaper': 'var(--wallpaper)',
      },
      borderColor: {
        'frame': 'rgba(255,255,255,.25)',
        'box': 'rgba(0,0,0,.25)',
      },
      boxShadow: {
        'frame': '-1px -1px 0px 0px rgba(255, 255, 255, 0.75) inset, 1px 1px 0px 0px rgba(0, 0, 0, 0.25) inset',
        'depressed': '-1px -1px 0px 0px rgba(0, 0, 0, 0.10) inset, 1px 1px 0px 0px rgba(0, 0, 0, 0.50) inset',
        'box': '1px 1px 0px 0px rgba(255, 255, 255, 0.75) inset, -1px -1px 0px 0px rgba(0, 0, 0, 0.25) inset',
      },
    },
  },
}
export default config
