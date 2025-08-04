// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this includes .jsx
  ],
  theme: {
    extend: {
      fontFamily: {
        // This is the custom font we discussed
        pacifico: ['Pacifico', 'cursive'], 
      },
    },
  },
  plugins: [],
}