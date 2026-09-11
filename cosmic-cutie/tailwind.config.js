module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./store/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: "#f8fbff",
          100: "#eef6ff",
          500: "#6f7cff",
          night: "#0d1026"
        }
      }
    }
  },
  plugins: []
};
