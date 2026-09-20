/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        git: {
          orange: '#F05133',
          red: '#FD6850',
          blue: '#2F81F7',
          green: '#2EA043',
          purple: '#A371F7',
          yellow: '#D29922',
          muted: '#8B949E',
        },
        dev: {
          bg: '#0D1117',
          panel: '#161B22',
          surface: '#21262D',
          border: '#30363D',
          highlight: '#388BFD',
          text: '#C9D1D9',
          heading: '#F0F6FC',
          subtext: '#8B949E',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        panel: '0 4px 12px 0 rgba(0, 0, 0, 0.4)',
        glow: '0 0 15px rgba(56, 139, 253, 0.25)',
      }
    },
  },
  plugins: [],
}
