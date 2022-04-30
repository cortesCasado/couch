module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'title': ['Oswald'],
      'body': ['Roboto'],
    },
    extend: {
      colors: {
        amber: {
          50: '#ffaa00'
        }
      }
    }
  },
  plugins: [],
};
