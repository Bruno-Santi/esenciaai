/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1423",
        secondary: "#D07380",
        tertiary: "#E5E5E5",
        quaternary: "#372549",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],

        manrope: ["Manrope", "sans-serif"],
      },
      screens: {
        lg: { min: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { min: "700px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
