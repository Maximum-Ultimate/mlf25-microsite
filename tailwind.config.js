/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite-react/**/*.js"
    ],
    theme: {
      extend: {
        fontFamily: {
          conthrax: ['conthrax-sb', 'sans-serif'],
          conthraxItalic: ['conthrax-bold-italic', 'sans-serif'],
          linotype: ['Linotype', 'sans-serif'],
        },
      },
    },
  };