import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        business: {
          ink: "#17211f",
          graphite: "#33413c",
          road: "#111411",
          sea: "#35665b",
          mint: "#eef4ef",
          coral: "#ef7f6d",
          amber: "#d49a2e",
          lavender: "#d8aecf",
          mist: "#f4ecde",
          line: "#e5d8c7",
          cream: "#fffaf4",
        },
      },
      boxShadow: {
        business: "0 16px 50px rgba(31, 51, 46, 0.10)",
        lift: "0 22px 70px rgba(31, 51, 46, 0.14)",
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
