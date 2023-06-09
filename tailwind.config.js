module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  purge: ["./src/**/*.js","./src/**/*.jsx","./src/**/*.ts","./src/**/*.tsx"],
  content: ["./*.html", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
};
