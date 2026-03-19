import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'rubik': ['Rubik', 'sans-serif'],
				'heebo': ['Heebo', 'sans-serif'],
				'hebrew': ['Rubik', 'Heebo', 'sans-serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-out': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(-10px)', opacity: '0' }
				},
				'pulse-gentle': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				'color-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'heartbeat': {
					'0%, 100%': { transform: 'scale(1)' },
					'25%': { transform: 'scale(1.3)' },
					'40%': { transform: 'scale(1)' },
					'60%': { transform: 'scale(1.2)' },
					'75%': { transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-button': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'rotate-sun': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.2)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'sparkle': {
					'0%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1.5)' },
					'100%': { opacity: '0', transform: 'scale(0)' }
				},
				'sparkle-delayed': {
					'0%': { opacity: '0', transform: 'scale(0)' },
					'20%': { opacity: '0', transform: 'scale(0)' },
					'70%': { opacity: '1', transform: 'scale(1.5)' },
					'100%': { opacity: '0', transform: 'scale(0)' }
				},
				'confetti-explosion': {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '1' },
					'100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' }
				},
				'button-press': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				},
				'ripple': {
					'0%': { opacity: '1', transform: 'scale(0)' },
					'100%': { opacity: '0', transform: 'scale(2)' }
				},
				'check-appear': {
					'0%': { opacity: '0', transform: 'scale(0) translateX(10px)' },
					'30%': { opacity: '1', transform: 'scale(1.2) translateX(0)' },
					'70%': { opacity: '1', transform: 'scale(1) translateX(0)' },
					'100%': { opacity: '0', transform: 'scale(0) translateX(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'slide-out': 'slide-out 0.4s ease-out',
				'pulse-gentle': 'pulse-gentle 2s infinite ease-in-out',
				'color-shift': 'color-shift 8s ease infinite',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'bounce-button': 'bounce-button 1s ease-in-out infinite',
				'rotate-sun': 'rotate-sun 30s linear infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'sparkle-delayed': 'sparkle-delayed 2s ease-in-out infinite',
				'confetti-explosion': 'confetti-explosion 2s ease-out forwards',
				'button-press': 'button-press 0.3s ease-out',
				'ripple': 'ripple 0.6s ease-out',
				'check-appear': 'check-appear 1.5s ease-in-out forwards'
			},
			backgroundImage: {
				'warm-gradient': 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--energy)))',
				'warm-subtle': 'linear-gradient(180deg, hsl(var(--background)), hsl(var(--primary-light)))',
			},
			spacing: {
				'base': '8px',
				'side-padding': '16px',
				'vertical-gap': '24px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
