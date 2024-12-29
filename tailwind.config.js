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
        secondary: "#72c0d1",
        neutral: "#eff6ff",
        accent: "#b91c1c",
        "custom-blue": "#1e3a8a",
      },
    },
  },
  plugins: [],
};
