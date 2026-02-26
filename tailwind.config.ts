import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#faf7f5",
          100: "#f3ede8",
          200: "#e8ddd3",
          300: "#d4c4b0",
          400: "#b5986e",
          500: "#96734a",
          600: "#8B4513",
          700: "#6d3610",
          800: "#4a2409",
          900: "#3C1810",
        },
        olive: {
          DEFAULT: "#6B7F3B",
          light: "#8FA653",
          dark: "#4A5829",
        },
        tomato: {
          DEFAULT: "#C0392B",
          light: "#E74C3C",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1140px",
        },
      },
      typography: {
        warm: {
          css: {
            "--tw-prose-body": "#3C1810",
            "--tw-prose-headings": "#3C1810",
            "--tw-prose-links": "#8B4513",
            "--tw-prose-bold": "#3C1810",
            "--tw-prose-counters": "#8B4513",
            "--tw-prose-bullets": "#8B4513",
            "--tw-prose-quotes": "#6d3610",
            "--tw-prose-quote-borders": "#d4c4b0",
            "--tw-prose-code": "#4a2409",
            "--tw-prose-hr": "#e8ddd3",
            h2: { marginTop: "2em", marginBottom: "0.75em" },
            h3: { marginTop: "1.5em", marginBottom: "0.5em" },
            p: { marginBottom: "1.25em" },
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { color: "#6d3610" },
            },
            img: {
              borderRadius: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
