import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        business: {
          ink: "#151917",
          graphite: "#2f3835",
          sea: "#2f6f65",
          mint: "#dceee8",
          coral: "#e46f5c",
          amber: "#d89b35",
          lavender: "#b7a3cf",
          mist: "#f6f4ee",
          line: "#e5ded2",
        },
      },
      boxShadow: {
        business: "0 14px 34px rgba(34, 43, 39, 0.08)",
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
