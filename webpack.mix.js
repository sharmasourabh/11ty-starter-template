const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");

// Paths
const paths = {
  sass: {
    source: "./src/resources/sass/main.scss",
    dest: "dist/src/css/",
  },
  javascript: {
    source: "./src/resources/js/main.js",
    singles: "./src/resources/js/singles/*",
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

  // Compile singles
  // .js(paths.javascript.singles, paths.javascript.dest)

  // Compile SCSS & TailwindCSS
  .sass(paths.sass.source, paths.sass.dest)
  .options({
    processCssUrls: false,
    postCss: [tailwindcss("./tailwind.config.js")],
  });

mix
  // Minifies CSS & JS files
  .minify(paths.sass.dest + "main.css")
  .minify(paths.javascript.dest + "main.js");
