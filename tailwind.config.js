/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EXACT PALETTE SPECIFICATION
        forest: {
          50: '#F0F6F3',
          100: '#DCECE5',
          200: '#B8D9CC',
          300: '#8EBFA9',
          400: '#5F9E82',
          500: '#356859', // Primary Deep Forest Green
          600: '#2C574A',
          700: '#23463B',
          800: '#1B352D',
          900: '#142721',
        },
        sage: {
          50: '#F5F8F4',
          100: '#EEF4EC', // Cards Soft Sage White
          200: '#DFEBDC',
          300: '#C7DDC2',
          400: '#A8C3A0', // Secondary Sage
          500: '#8AA882',
          600: '#6E8A66',
          700: '#546C4E',
          800: '#3D4F39',
          900: '#283425',
        },
        terracotta: {
          50: '#FDF7F4',
          100: '#FAEFE9',
          200: '#F5DDD1',
          300: '#ECC4B2',
          400: '#E2A58B',
          500: '#D88965', // Accent Warm Terracotta
          600: '#C4724D',
          700: '#A85A37',
          800: '#874426',
          900: '#632E16',
        },
        cream: {
          DEFAULT: '#F8F5ED', // Background Warm Cream
          50: '#FCFAF6',
          100: '#F8F5ED',
          200: '#EFE9D9',
          300: '#E3DAC1',
          400: '#D5C7A5',
          500: '#C4B287',
        },
        sand: {
          50: '#FCFAF6',
          100: '#F8F5ED', // Mapped to Warm Cream
          200: '#EEF4EC', // Mapped to Soft Sage White
          300: '#DFEBDC',
          400: '#C7DDC2',
          500: '#A8C3A0',
        },
        charcoal: {
          DEFAULT: '#26332F', // Text Deep Charcoal
          50: '#F4F6F5',
          100: '#E2E6E4',
          500: '#526861',
          800: '#26332F',
          900: '#1A2320',
        },
        mutedgreen: {
          DEFAULT: '#5E9367', // Success Muted Green
          100: '#EAF3EC',
          500: '#5E9367',
          700: '#436B4A',
        },
        softred: {
          DEFAULT: '#C95C5C', // Emergency Soft Red
          100: '#FCECEC',
          500: '#C95C5C',
          700: '#9E3F3F',
        },
        assam: {
          gold: '#D4AF37',
          tea: '#356859',
          silk: '#F8F5ED',
          sky: '#EEF4EC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(53, 104, 89, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 12px 32px -4px rgba(38, 51, 47, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'touch': '0 8px 0 0 rgba(216, 137, 101, 0.25), 0 10px 24px -2px rgba(216, 137, 101, 0.25)',
      }
    },
  },
  plugins: [],
}
