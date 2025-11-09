/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ correct place for DaisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake"], // you can choose themes here
  },
}
