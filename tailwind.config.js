/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 500ms ease-in-out"
      },
      screens: {
        "3xl" : "1600px"
      },
    },
  },
  plugins: [],
}
