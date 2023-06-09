/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}", 
      "./src/RenteeScreens/*.{js,jsx,ts,tsx}",
      "./src/LogScreen/*.{js,jsx,ts,tsx}",
      "./src/screens/MainScreen/*.{js,jsx,ts,tsx}",
      "./src/components/*.{js,jsx,ts,tsx}",
      "./src/navigation/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  