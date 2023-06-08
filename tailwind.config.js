module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  content: ["./*.html", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
};
