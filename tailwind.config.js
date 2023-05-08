/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#141625",
          800: "#0C0E16",
          700: "#1E2139",
          600: "#252945",
          500: "#7C5DFA",
          400: "#7E88C3",
          300: "#9277FF",
          200: "#888EB0",
          100: "#DFE3FA",
        },
        gray: {
          primary: "#F8F8FB",
        },
        red: {
          primary: "#EC5757",
        },
      },
      maxWidth: {
        730: "45.625rem", // 730px
      },
    },
  },
  plugins: [],
};
