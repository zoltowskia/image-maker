import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#080f18",
        main: "#000D1C", // --color-primary-10 from Figma
        footer: "#0d2a52",
        borderSubtle: "rgba(255,255,255,0.14)",
        borderFaint: "rgba(255,255,255,0.08)",
        textPrimary: "#f4f6f8",
        textMuted: "#93a1b3",
        textDim: "#5c6b80",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        chip: "9px",
      },
    },
  },
  plugins: [],
};
export default config;
