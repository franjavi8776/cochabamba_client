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
        primary: "#000000",
        primary_opacity: "#00000099",
        secondary: "#72c0d1",
        neutral: "#eff6ff",
        neutral_opacity: "#eff6ff80",
        accent: "#b91c1c",
        "custom-blue": "#1e3a8a",
      },
    },
  },
  plugins: [],
};
