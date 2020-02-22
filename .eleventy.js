const htmlmin = require("html-minifier");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

const AuthorInfo = require(`./src/site/_includes/components/author-info`);

module.exports = eleventyConfig => {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ["md", "njk"], // default, add more file extensions here
    // accepts an array or a comma-delimited string
    words: "literally,simply,obviously,basically,of course,clearly,just,everyone knows,however,so,easy"
  });

  // Add a readable date formatter filter to Nunjucks
  eleventyConfig.addFilter(
    "dateDisplay",
    require("./src/site/_filters/dates.js")
  );
  // Add a HTML timestamp formatter filter to Nunjucks
  eleventyConfig.addFilter(
    "htmlDateDisplay",
    require("./src/site/_filters/timestamp.js")
  );
  eleventyConfig.addFilter("log", obj => {
    console.log(obj);
  });
  eleventyConfig.addFilter("search", require("./src/site/_filters/searchFilter.js"));

  eleventyConfig.addShortcode("AuthorInfo", AuthorInfo);

  // Minify our HTML
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        const content_404 = fs.readFileSync("dist/404.html");

        bs.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Collections
  eleventyConfig.addCollection(
    "blog",
    require("./src/site/_collections/blog.js")
  );
  eleventyConfig.addCollection(
    "customAll",
    require("./src/site/_collections/customAll.js")
  );

  // Layout aliases
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Include our static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("robots.txt");

  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,

    dir: {
      input: "src/site/content",
      output: "dist",
      includes: "../_includes",
      data: "../_data"
    }
  };
};
