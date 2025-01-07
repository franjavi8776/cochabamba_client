/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        winter: ["WinterTrendy", "sans-serif"],
      },
      colors: {
        primary: "#1f2d4e",
        primary_opacity: "#1f2d4e98",
        secondary: "#4968B0",
        neutral: "#eff6ff",
        neutral_opacity: "#eff6ff98",
        accent: "#b91c1c",
        "custom-blue": "#1e3a8a",
      },
    },
  },
  plugins: [],
};
