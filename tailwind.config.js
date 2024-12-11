/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
    "./node_modules/@nextui-org/theme/dist/components/button.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    nextui(),
  ],
}