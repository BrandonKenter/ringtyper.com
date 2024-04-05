/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      ProtestRiot: ["Protest Riot", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Nunito: ["Nunito", "sans-serif"],
      BebasNeue: ["Bebas Neue", "sans-serif"],
      SourceCodePro: ["Source Code Pro", "monospace"],
      FiraCode: ["Fira Code", "monospace"],
    },
  },
  plugins: [],
};
