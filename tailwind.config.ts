import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#faf8f5",
          100: "#f5f0eb",
          900: "#181411",
        },
        gold: {
          400: "rgb(var(--color-gold-400) / <alpha-value>)",
          500: "#14b8a6",
          600: "#0d9488",
        },
        // Arno Navy & Teal branding (replaces the earlier Tuscan
        // terracotta/amber palette to match the navy boat/bridge logo art)
        canal: {
          blue: "rgb(var(--color-canal-blue) / <alpha-value>)",
          primary: "rgb(var(--color-canal-primary) / <alpha-value>)",
          orange: "rgb(var(--color-canal-primary) / <alpha-value>)",
          ink: "rgb(var(--color-canal-ink) / <alpha-value>)",
          navy: "#181411",
          azure: "#0d9488",
          royal: "#1d4ed8",
          sapphire: "#172554",
        },
        arno: {
          terracotta: "#1d4ed8",
          amber: "#0d9488",
          river: "#0d9488",
          night: "#181411",
        },
        // Full palette overrides — every amber/orange/rose shade actually
        // used across the site now resolves to teal/blue/indigo instead,
        // so no component className strings needed touching individually.
        amber: {
          50: "#f0fdfa",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        orange: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          950: "#172554",
        },
        rose: {
          600: "#4f46e5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 15% 25%, rgba(29,78,216,0.25) 0, transparent 45%), radial-gradient(circle at 85% 15%, rgba(13,148,136,0.22) 0, transparent 45%), radial-gradient(circle at 50% 85%, rgba(24,20,17,0.45) 0, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(29, 78, 216, 0.35)",
        "blue-glow": "0 0 35px -5px rgba(13, 148, 136, 0.35)",
        "amber-glow": "0 0 35px -5px rgba(20, 184, 166, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
