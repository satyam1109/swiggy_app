/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        'extra': '1.2rem', // You can adjust the value as needed
      },
    },
  },
  plugins: [],
}

