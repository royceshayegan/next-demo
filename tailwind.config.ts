import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
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
    container: {
			center: true,
			padding: {
				DEFAULT: '4%',
        lg: '8%',
        '3xl': '12%',
        '4xl': '18%',
			}
		},
		screens: {
			xs: '360px',
			...defaultTheme.screens
		},
    extend: {
      spacing: {
        'site': 'var(--site-height)',
        'navbar': 'var(--navbar-height)',
        'input': 'var(--input-height)',
        'button': 'var(--button-height)',
      },
      height: {
        'site': 'var(--site-height)',
        'navbar': 'var(--navbar-height)',
        'input': 'var(--input-height)',
        'button': 'var(--button-height)',
      },
      screens: {
				'3xl': '1920px',
        '4xl': '2560px',
			},
      colors: {
        'wallpaper-color': 'var(--wallpaper-color)',
        'surface': 'var(--surface)',
        'surface-inset': 'var(--surface-inset)',
        'surface-navbar': 'var(--surface-navbar)',
        'surface-window': 'var(--surface-window)',
        'neutral': 'var(--neutral)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
        'on-wallpaper-color': 'var(--on-wallpaper-color)',
        'on-surface': 'var(--on-surface)',
        'on-surface-inset': 'var(--on-surface-inset)',
        'on-surface-navbar': 'var(--on-surface-navbar)',
        'on-surface-window': 'var(--on-surface-window)',
        'on-neutral': 'var(--on-neutral)',
        'on-primary': 'var(--on-primary)',
        'on-secondary': 'var(--on-secondary)',
        'on-tertiary': 'var(--on-tertiary)',
        'on-accent': 'var(--on-accent)',
        'on-success': 'var(--on-success)',
        'on-warning': 'var(--on-warning)',
        'on-error': 'var(--on-error)',
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
