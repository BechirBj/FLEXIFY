/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors:{
        primary: '#2563EB', 
        secondary: '#1E293B', 
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
        info: '#2196F3',
        light: '#F1F1F1',
        dark: '#212121',
        black: '#000000',
        white: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

