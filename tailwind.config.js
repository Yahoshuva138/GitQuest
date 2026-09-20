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
        },
        rpg: {
          dark: '#0A0E17',
          card: '#131A29',
          border: '#2A364F',
          gold: '#FBBF24',
          gem: '#38BDF8',
          xp: '#C084FC',
          streak: '#FB923C',
          grass: '#22C55E',
          water: '#0EA5E9',
          dungeon: '#8B5CF6',
          volcano: '#F43F5E',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        panel: '0 4px 12px 0 rgba(0, 0, 0, 0.4)',
        glow: '0 0 15px rgba(56, 139, 253, 0.25)',
        pixel: '0 4px 0 0 #1E293B',
        pixelEmerald: '0 4px 0 0 #065F46',
        pixelBlue: '0 4px 0 0 #1E40AF',
        pixelPurple: '0 4px 0 0 #6B21A8',
        pixelOrange: '0 4px 0 0 #9A3412',
      }
    },
  },
  plugins: [],
}
