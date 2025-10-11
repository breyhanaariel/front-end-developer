module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aura: {
          50: "#fffaf8",
          100: "#fff0ee",
          500: "#ff7fbf"
        },
        ambiance: {
          50: "#f8fafc",
          100: "#f0f6ff",
          500: "#6f7cff"
        }
      }
    }
  },
  plugins: []
};