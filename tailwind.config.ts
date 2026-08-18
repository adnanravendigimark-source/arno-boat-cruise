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
        // "Ivory & Forest" brand palette — deep forest green as the primary
        // (buttons, links, badges, matches the new logo's "A" monogram)
        // paired with a muted sage/olive secondary accent (matches the
        // logo's skyline art and "BOAT CRUISE" wordmark).
        forest: {
          50: "#f0f4ee",
          100: "#dbe6d5",
          200: "#b8cead",
          300: "#8fac7d",
          400: "#6a8c56",
          500: "#4c6f3c",
          600: "#395a2b",
          700: "#2c4622",
          800: "#24371f",
          900: "#1c2b18",
          950: "#101a0e",
        },
        // Sage / olive — secondary accent. The 400 shade is driven by the
        // admin-editable theme.accent value (see DEFAULT_THEME in
        // lib/homepage.ts); the rest of the ramp is a static sage scale.
        sage: {
          50: "#f6f7f1",
          100: "#e9ecdf",
          200: "#d1d8bd",
          300: "#b3bd94",
          400: "rgb(var(--color-sage-400) / <alpha-value>)",
          500: "#889068",
          600: "#707858",
          700: "#5a6146",
          800: "#474c38",
          900: "#383c2c",
          950: "#22251a",
        },
        // Admin-editable brand accent tokens (driven by CSS vars set from
        // theme.primary/secondary/dark in lib/homepage.ts DEFAULT_THEME) —
        // forest-green primary paired with a sage secondary, used
        // sparingly for icons/dark sections.
        canal: {
          blue: "rgb(var(--color-canal-blue) / <alpha-value>)",
          primary: "rgb(var(--color-canal-primary) / <alpha-value>)",
          orange: "rgb(var(--color-canal-primary) / <alpha-value>)",
          ink: "rgb(var(--color-canal-ink) / <alpha-value>)",
          navy: "#181411",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 15% 25%, rgba(36,55,31,0.25) 0, transparent 45%), radial-gradient(circle at 85% 15%, rgba(112,120,88,0.22) 0, transparent 45%), radial-gradient(circle at 50% 85%, rgba(24,20,17,0.45) 0, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(36, 55, 31, 0.35)",
        "blue-glow": "0 0 35px -5px rgba(31, 100, 89, 0.35)",
        "amber-glow": "0 0 35px -5px rgba(112, 120, 88, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
