import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        terminal: {
          green: '#00ff41',
        },
        editor: {
          blue: '#007acc',
        },
        dark: {
          DEFAULT: '#1e1e1e',
          lighter: '#252525',
          darker: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
