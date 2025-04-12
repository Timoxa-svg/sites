/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #3B82F6, #22D3EE)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};