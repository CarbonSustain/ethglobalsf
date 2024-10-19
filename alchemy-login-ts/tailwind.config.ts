/** @type {import('tailwindcss').Config} */
import { createColorSet, withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  colors: {
    "btn-primary": createColorSet("#90e4c1", "#90e4c1"),
    "fg-accent-brand": createColorSet("##90e4c1", "#90e4c1"),
  },
  plugins: [],
});
