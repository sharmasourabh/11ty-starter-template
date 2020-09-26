module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    layers: ["utilities"],
    content: [
      "./src/site/**/*.html",
      "./src/site/**/*.md",
      "./src/site/**/*.njk",
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
