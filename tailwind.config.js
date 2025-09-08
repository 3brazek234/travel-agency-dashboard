/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark:   { 100:"#1f1f36", 200:"#141627", 300:"#101828", 400:"#2e2c48" },
        gray:   { 100:"#7f7e83", 200:"#eaecf0", 500:"#667085", 700:"#344054" },
        primary:{ 50:"#e9f3fb", 100:"#256ff1", 500:"#175cd3" },
        light:  { 100:"#ecf2ef", 200:"#f9fbfc", 300:"#f2f4f7", 400:"#ebeeed", 500:"#e3f1ff" },
        success:{ 50:"#ecfdf3", 500:"#12b76a", 700:"#027a48" },
        pink:   { 50:"#f7edf6", 500:"#c11574" },
        navy:   { 50:"#f0f9ff", 500:"#026aa2" },
        red:    { 50:"#fff4ed", 100:"#ff543d", 500:"#b93815" },
      },
      borderRadius: {
        20: "20px",
      },
      boxShadow: {
        100: "0px 1px 3px 0px rgba(16,24,40,.1), 0px 1px 2px rgba(16,24,40,.06)",
        200: "0px 12px 16px -4px rgba(16,24,40,.1), 0px 4px 20px -2px rgba(16,24,40,.2)",
        300: "0px 2px 30px rgba(0,0,0,.05)",
        400: "0px 2px 6px rgba(13,10,44,.08)",
        500: "0px 12px 16px -4px rgba(16,24,40,.1)",
      },
    },
  },
  plugins: [],
};
