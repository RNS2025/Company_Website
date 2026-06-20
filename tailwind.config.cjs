/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        'surface-variant': '#1e1e1e',
        outline: '#333333',
        primary: {
          DEFAULT: '#8b5cf6',
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD1C2',
          300: '#FFB9A3',
          400: '#FFA185',
          500: '#FF6941',  // Primær orange
          600: '#F2865F',  // Lysere orange
          700: '#E05030',
          800: '#C53D1F',
          900: '#A82E13',
        },
        dark: {
          DEFAULT: '#2A2A2A',  // Baggrund
          lighter: '#3b3b3b',  // Kort
          border: '#4a4a4a',   // Kanter
        },
        brand: {
          lightest: '#F2F2F3',
          light:    '#EAE9E9',
          teal:     '#314245',
          dark:     '#2A2A2A',
          orange:   '#FF6941',
          peach:    '#F2865F',
        },
        accent: {
          teal: '#314245',
        }
      },
      fontFamily: {
        headline: ["Public Sans", "sans-serif"],
        display: ["Public Sans", "sans-serif"],
        body: ["Public Sans", "sans-serif"],
        label: ["Public Sans", "sans-serif"]
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #FF6941 0%, #F2865F 100%)',
      }
    },
  },
  plugins: [],
};
