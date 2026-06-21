import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porter: {
          ink: "#17211f",
          moss: "#35665b",
          eucalyptus: "#6ea695",
          coral: "#ef7f6d",
          butter: "#f4c96b",
          sky: "#a8cfe3",
          mist: "#f5f7f4",
          lavender: "#d8aecf",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
