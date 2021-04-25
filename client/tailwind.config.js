module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        appeals: '1fr 3fr 4fr 3fr 3fr 3fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
