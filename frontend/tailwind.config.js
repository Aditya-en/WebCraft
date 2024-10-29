/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      richBlack: '#0B0C10',     // Background color
      silver: '#C5C6C7',         // Primary text color
      brightCyan: '#66FCF1',     // Secondary text color and links
      darkBlueGray: '#1F2833',   // Links/accent color on hover
      deepNavy: '#1F1A2A',},
  },
  plugins: [],
};
