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
          500: "#f59e0b",
          600: "#d97706",
        },
        // Florentine Tuscan & Arno river branding
        canal: {
          blue: "rgb(var(--color-canal-blue) / <alpha-value>)",
          primary: "rgb(var(--color-canal-primary) / <alpha-value>)",
          orange: "rgb(var(--color-canal-primary) / <alpha-value>)",
          ink: "rgb(var(--color-canal-ink) / <alpha-value>)",
          navy: "#181411",
          azure: "#0d9488",
          royal: "#c85a32",
          sapphire: "#b44d28",
        },
        arno: {
          terracotta: "#c85a32",
          amber: "#d97706",
          river: "#0d9488",
          night: "#181411",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 15% 25%, rgba(200,90,50,0.25) 0, transparent 45%), radial-gradient(circle at 85% 15%, rgba(13,148,136,0.22) 0, transparent 45%), radial-gradient(circle at 50% 85%, rgba(24,20,17,0.45) 0, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(200, 90, 50, 0.35)",
        "blue-glow": "0 0 35px -5px rgba(13, 148, 136, 0.35)",
        "amber-glow": "0 0 35px -5px rgba(245, 158, 11, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
