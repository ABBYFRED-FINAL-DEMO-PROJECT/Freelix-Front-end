/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      display: ['print'],
      borderWidth: ['print'],
      borderColor: ['print'],
      shadow: ['print'],
    },
  },
  plugins: [],
}