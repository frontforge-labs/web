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
        bg: {
          DEFAULT: "var(--fe-bg)",
        },
        text: {
          DEFAULT: "var(--fe-text)",
        },
        accent: {
          DEFAULT: "var(--fe-accent)",
          foreground: "var(--fe-accent-foreground)",
        },
        border: {
          DEFAULT: "var(--fe-border)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--fe-radius)",
      },
    },
  },
  plugins: [],
} satisfies Config;
