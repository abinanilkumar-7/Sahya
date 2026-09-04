/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F5F9',
          100: '#DDE7F0',
          200: '#BACFD7',
          300: '#8DAEBD',
          400: '#54829A',
          500: '#2E5F78',
          600: '#1B4760',
          700: '#0C3348',
          800: '#063B5C',
          900: '#04263D',
          950: '#021625',
        },
        teal: {
          50: '#EAF8F8',
          100: '#CEF0F1',
          200: '#A1E2E4',
          300: '#6AD0D4',
          400: '#34B7BD',
          500: '#0F9FA8',
          600: '#0C8087',
          700: '#0A656B',
          800: '#0B5156',
          900: '#0D4448',
        },
        cyan: {
          50: '#F0FCFD',
          100: '#D8F7FA',
          200: '#B5EEF5',
          300: '#7FE0ED',
          400: '#39C6D5',
          500: '#1EA6B7',
          600: '#1B8699',
          700: '#1C6C7C',
          800: '#1E5967',
          900: '#1D4A57',
        },
        emergency: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E05252',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        brandbg: '#F4F8FA',
        cardbg: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(6, 59, 92, 0.08)',
        'glass-hover': '0 14px 40px 0 rgba(6, 59, 92, 0.14)',
        'emergency': '0 0 20px rgba(224, 82, 82, 0.35)',
        'subtle': '0 2px 15px -3px rgba(6, 59, 92, 0.05), 0 4px 6px -2px rgba(6, 59, 92, 0.03)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(15, 159, 168, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(15, 159, 168, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
