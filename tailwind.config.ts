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
        transport: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#a8bffc',
          400: '#7a96f7',
          500: '#556fee',
          600: '#3949e0',
          700: '#2d3bc6',
          800: '#2832a0',
          900: '#1a365d',
        },
        custom: {
          white: '#FFFFFF',
          black: '#000000',
          green: {
            light: '#E2FCE2',
            DEFAULT: '#2ECC71',
            dark: '#27AE60'
          },
          orange: {
            light: '#FEC6A1',
            DEFAULT: '#F97316',
            dark: '#D35400'
          },
          blue: {
            light: '#AED8E0',
            DEFAULT: '#1EAEDB',
            dark: '#0EA5E9'
          }
        },
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 0%)',
        primary: {
          DEFAULT: 'hsl(142 70% 45%)',
          foreground: 'hsl(0 0% 100%)'
        },
        secondary: {
          DEFAULT: 'hsl(28 87% 62%)',
          foreground: 'hsl(0 0% 0%)'
        },
        accent: {
          DEFAULT: 'hsl(197 89% 48%)',
          foreground: 'hsl(0 0% 100%)'
        }
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
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
