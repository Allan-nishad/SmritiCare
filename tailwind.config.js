/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF9F5',
          100: '#F6F2EA',
          200: '#EDE4D4',
          300: '#E0D2BC',
          400: '#CEB896',
          500: '#BA9C72',
        },
        terracotta: {
          50: '#FDF6F2',
          100: '#FAECE4',
          200: '#F5D7C7',
          300: '#EEB9A0',
          400: '#E49271',
          500: '#D96B43',
          600: '#C5542D',
          700: '#A43F20',
        },
        sage: {
          50: '#F3F7F5',
          100: '#E4EDE8',
          200: '#C9DCD2',
          300: '#A3C4B3',
          400: '#75A58F',
          500: '#4E7B67',
          600: '#3D6252',
          700: '#324E42',
        },
        assam: {
          gold: '#D4AF37',
          tea: '#5C3A21',
          silk: '#F4E4BA',
          sky: '#EBF4F6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(186, 156, 114, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 12px 32px -4px rgba(84, 60, 36, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'touch': '0 8px 0 0 rgba(197, 84, 45, 0.2), 0 10px 24px -2px rgba(217, 107, 67, 0.25)',
      }
    },
  },
  plugins: [],
}
