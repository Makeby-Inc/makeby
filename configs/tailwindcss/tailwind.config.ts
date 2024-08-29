import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

// https://github.com/themesberg/flowbite/issues/488
const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.tsx',
		'./**/src/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./stories/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: ['class'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				pc: '1280px'
			},
			fontFamily: {
				sans: [
					'"Pretendard Variable"',
					'Pretendard',
					...defaultTheme.fontFamily.sans
				]
			},
			colors: {
				brand: {
					50: 'hsl(var(--brand-50))',
					100: 'hsl(var(--brand-100))',
					200: 'hsl(var(--brand-200))',
					300: 'hsl(var(--brand-300))',
					400: 'hsl(var(--brand-400))',
					500: 'hsl(var(--brand-500))',
					600: 'hsl(var(--brand-600))',
					700: 'hsl(var(--brand-700))',
					800: 'hsl(var(--brand-800))',
					900: 'hsl(var(--brand-900))'
				},
				base: {
					50: 'hsl(var(--base-50))',
					100: 'hsl(var(--base-100))',
					200: 'hsl(var(--base-200))',
					300: 'hsl(var(--base-300))',
					400: 'hsl(var(--base-400))',
					500: 'hsl(var(--base-500))',
					600: 'hsl(var(--base-600))',
					700: 'hsl(var(--base-700))',
					800: 'hsl(var(--base-800))',
					900: 'hsl(var(--base-900))'
				},
				border: 'hsl(var(--border))',
				strong: 'hsl(var(--strong ))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				hover: 'hsl(var(--hover))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					hover: 'hsl(var(--destructive-hover))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				negative: 'hsl(var(--negative))',
				cautionary: 'hsl(var(--cautionary))',
				positive: 'hsl(var(--positive))',
				informative: 'hsl(var(--informative))'
			},
			borderRadius: {
				'input-lg': 'var(--input-lg)',
				'input-md': 'var(--input-md)',
				'button-lg': 'var(--button-lg)',
				'button-md': 'var(--button-md)',
				'button-sm': 'var(--button-sm)',
				xl: 'var(--element-xl)',
				lg: 'var(--element-lg)',
				md: 'var(--element-md)',
				sm: 'var(--element-sm)',
				xs: 'var(--element-xs)'
			},
			spacing: {
				'3xs': '2px',
				'2xs': '4px',
				xs: '8px',
				sm: '12px',
				md: '16px',
				lg: '24px',
				xl: '32px',
				'2xl': '40px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			animationDuration: {
				'2s': '2s',
				'3s': '3s',
				'4s': '4s',
				'5s': '5s'
			},
			scrollbar: {
				hide: {
					'::-webkit-scrollbar': { display: 'none' },
					'-ms-overflow-style': 'none', // IE and Edge
					'scrollbar-width': 'none' // Firefox
				}
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({ addUtilities }) {
			const scrollbarHidden = {
				'.scrollbar-hide': {
					'::-webkit-scrollbar': { display: 'none' },
					'-ms-overflow-style': 'none', // IE and Edge
					'scrollbar-width': 'none' // Firefox
				}
			}
			addUtilities(scrollbarHidden)
		})
	]
}
export default config
