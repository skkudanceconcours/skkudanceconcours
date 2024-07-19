import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        HSBombaram: ["var(--font-HSBombaram)"],
        UniverseLTPro: ["var(--font-UniverseLTPro)"],
      },
      animation: {
        loading: "loading 2s linear infinite",
      },
      keyframes: {
        loading: {
          "0%": { transform: "scale(1) rotate(0)" },
          "20%, 25%": { transform: "scale(1.3) rotate(90deg)" },
          "45%, 50%": { transform: "scale(1) rotate(180deg)" },
          "70%, 75%": { transform: "scale(1.3) rotate(270deg)" },
          "95%, 100%": { transform: "scale(1) rotate(360deg)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-scrollbar-hide")],
};
export default config;
