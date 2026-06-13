/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F4F1",
        ink: "#1B1A18",
        graphite: "#34312D",
        stone: "#8D8477",
        linen: "#E5DED3",
        brass: "#A38A61",
      },
      fontFamily: {
        editorial: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        hairline: "inset 0 0 0 1px rgba(27, 26, 24, 0.08)",
      },
    },
  },
  plugins: [],
};
