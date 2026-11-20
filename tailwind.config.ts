import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        // Code2Chill Cohesive Brand Palette (Derived from Official Logo)
        canvas: {
          DEFAULT: "var(--canvas)",
          muted: "var(--canvas-muted)",
          subtle: "var(--canvas-subtle)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        brand: {
          "navy-dark": "var(--brand-navy-dark)",
          navy: "var(--brand-navy)",
          "navy-surface": "var(--brand-navy-surface)",
          slate: "var(--brand-slate)",
          blue: "var(--brand-blue)",
          "blue-hover": "var(--brand-blue-hover)",
          "blue-light": "var(--brand-blue-light)",
          cyan: "var(--brand-cyan)",
          ice: "var(--brand-ice)",
          lime: "var(--brand-lime)",
          "lime-dark": "var(--brand-lime-dark)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
        },
        status: {
          success: "var(--status-success)",
          warning: "var(--status-warning)",
          error: "var(--status-error)",
          info: "var(--status-info)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(11, 18, 36, 0.04), 0 1px 2px 0 rgba(11, 18, 36, 0.02)",
        card: "0 4px 12px -2px rgba(11, 18, 36, 0.06), 0 2px 4px -1px rgba(11, 18, 36, 0.03)",
        lifted: "0 14px 30px -6px rgba(11, 18, 36, 0.12), 0 6px 12px -3px rgba(11, 18, 36, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
