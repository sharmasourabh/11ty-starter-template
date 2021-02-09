const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const path = require("path");

// Paths
const paths = {
  sass: {
    source: "./src/resources/sass/main.scss",
    dest: "dist/src/css/",
  },
  javascript: {
    source: "./src/resources/js/main.js",
    dest: "dist/src/js/",
  },
};

// Run mix
mix

  .webpackConfig({
    resolve: {
      alias: {
        "@utilities": path.resolve(__dirname, "src/resources/js/utilities"),
        "@modules": path.resolve(__dirname, "src/resources/js/modules"),
      },
    },
  })

  // Concatenate & Compile Javascript
  .js(paths.javascript.source, paths.javascript.dest)

  // Compile SCSS & TailwindCSS
  .sass(paths.sass.source, paths.sass.dest)
  .options({
    processCssUrls: false,
    postCss: [tailwindcss("./tailwind.config.js")],
  });
