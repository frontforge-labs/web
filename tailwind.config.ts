import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@frontenzo/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        bg: {
          DEFAULT: "var(--fe-bg)",
        },
        text: {
          DEFAULT: "var(--fe-text)",
          muted: "var(--fe-text-muted)",
        },
        border: {
          DEFAULT: "var(--fe-border)",
        },

        // Surface levels
        surface: {
          1: "var(--fe-surface-1)",
          2: "var(--fe-surface-2)",
          3: "var(--fe-surface-3)",
        },

        // Brand
        accent: {
          DEFAULT: "var(--fe-accent)",
          hover: "var(--fe-accent-hover)",
          foreground: "var(--fe-accent-foreground)",
        },

        // Semantic colors
        success: {
          DEFAULT: "var(--fe-success)",
          hover: "var(--fe-success-hover)",
          foreground: "var(--fe-success-foreground)",
          muted: "var(--fe-success-muted)",
        },
        warning: {
          DEFAULT: "var(--fe-warning)",
          hover: "var(--fe-warning-hover)",
          foreground: "var(--fe-warning-foreground)",
          muted: "var(--fe-warning-muted)",
        },
        error: {
          DEFAULT: "var(--fe-error)",
          hover: "var(--fe-error-hover)",
          foreground: "var(--fe-error-foreground)",
          muted: "var(--fe-error-muted)",
        },
        info: {
          DEFAULT: "var(--fe-info)",
          hover: "var(--fe-info-hover)",
          foreground: "var(--fe-info-foreground)",
          muted: "var(--fe-info-muted)",
        },
      },

      // Border radius
      borderRadius: {
        DEFAULT: "var(--fe-radius)",
        sm: "var(--fe-radius-sm)",
        md: "var(--fe-radius-md)",
        lg: "var(--fe-radius-lg)",
      },

      // Box shadows
      boxShadow: {
        sm: "var(--fe-shadow-sm)",
        DEFAULT: "var(--fe-shadow)",
        md: "var(--fe-shadow-md)",
        lg: "var(--fe-shadow-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
