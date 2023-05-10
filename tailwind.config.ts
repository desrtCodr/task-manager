import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "320px",
      sm: "640px",
      md: "735px",
      lg: "1040px",
      xl: "1280px",
    },
  },
  plugins: [],
} satisfies Config;
