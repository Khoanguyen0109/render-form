module.exports = {
  content: ['./src/*.{html,js}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
};
