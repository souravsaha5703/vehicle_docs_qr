/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../images/login\ signup\ bg.png')",
      },
      fontFamily:{
        poppins:["Poppins", "sans-serif"],
        oswald:["Oswald", "sans-serif"],
        noto:["Noto Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}