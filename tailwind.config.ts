import type { Config } from 'tailwindcss'  
  
const config: Config = {  
  content: [  
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',  
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',  
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',  
  ],  
  darkMode: 'class',  
  theme: {  
    extend: {  
      fontFamily: {  
        sans: ['var(--font-inter)'],  
        display: ['var(--font-space)'],  
      },  
      colors: {  
        bg: '#0a0a0a',  
        'bg-elevated': '#141414',  
        accent: '#6366f1',  
      }  
    },  
  },  
  plugins: [],  
}  
export default config  
