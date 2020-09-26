# 11ty-starter-template [![Netlify Status](https://api.netlify.com/api/v1/badges/c8dee1ed-c3cc-49ad-9e57-edb40762c94d/deploy-status)](https://app.netlify.com/sites/11ty-starter-template/deploys)

JAMStack Static Site Generator template built with Eleventy and TailwindCSS.

Demo: <https://11ty-starter-template.netlify.com/>

## Features

- Build sites faster with the power of [Eleventy](https://www.11ty.dev/docs/), [TailwindCSS](https://tailwindcss.com) and SCSS
- [Laravel Mix](https://laravel-mix.com/docs/5.0/basic-example) (Webpack) to watch, concatenate and compile styles and scripts
- HTML minifier
- Tailwind Purge CSS for unused CSS
- SEO friendly pages
- Image lazyloading
- A simple blog with tags and featured images
- `common-tags` is used for shortcodes
- `date-fns` is used for date operations.
- 404 page will display for browser-sync.
- Plugin for Code Syntax Highlight and RSS
- Author Info Card
- Supports both blog created and updated date
- Paginated Blog Page with responsive grid layout
- Page anchors and Table of Content support
- Support markdown/blockquote with information box
- Default config is used in tailwind.config.js
- Search feature using elasticlunr
- eleventy-plugin-inclusive-language plugin for linting the avoidable words in post

## Requirements

Node `>=` v12.0.0

## Installation

```bash
npm install
```

To start the development server (and Mix), run the `npm run dev` on windows and `npm run devl` on linux and iOS command in terminal. Eleventy has hot reloading baked in and will automatically watch your template files for changes. Mix will watch any changes to the JS and SCSS files.

## Folder Structure

The `src` folder contains all the source. The `dist` folder contains generated content. The `src/site` folder contains all the templates, partials and content - which Eleventy will parse into HTML for us.

Within our `site` folder, lives a `_data` folder. Here you'll find a `site.json` file - for general config stuff e.g site name, author, email, social media links etc.

You'll also find a `navigation.json` file, which we use to loop over in our nav partial to generate our navigation. There's also a `helpers.js` file, which just contains a simple environment helper.

Uncompiled SCSS and JS reside in the `src/resources` folder - as mentioned above, Mix will be watching these folders for any changes (you should restart the server when creating new partials/folders).

In development mode, 11ty-starter-template will reference `src/css/main.css` for it's stylesheet. This will be pretty chunky in file size (around 800KB!), due to the amount of Tailwind utility classes - but don't worry, 11ty-starter-template has you covered!

## Production

Type the `npm run prod` command to minify scripts, styles and run Purgecss.

Purge will cross reference your templates/HTML with all those Tailwind classes and will remove any classes you haven't used - pretty cool huh?

11ty-starter-template will now reference `main.min.css` as the new stylesheet (annoyingly, Mix also minifies `main.css` as well - this bugs the hell out of me!).

## Adding page anchor and table of content

1. Run `yarn add slugify markdown-it markdown-it-anchor markdown-it-table-of-contents -D`
2. Add following code in `.eleventy.js`

   ```js
   const slugify = require("slugify");
   const markdownIt = require("markdown-it");
   // Markdown

   function removeExtraText(s) {
     let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
     newStr = newStr.replace(/⚠️/g, "");
     newStr = newStr.replace(/[?!]/g, "");
     newStr = newStr.replace(/<[^>]*>/g, "");
     return newStr;
   }
   function markdownItSlugify(s) {
     return slugify(removeExtraText(s), { lower: true, remove: /[:’'`,]/g });
   }
   let markdownItAnchor = require("markdown-it-anchor");
   let markdownItToc = require("markdown-it-table-of-contents");
   let mdIt = markdownIt({
     html: true,
     breaks: true,
     linkify: true,
   })
     .use(markdownItAnchor, {
       permalink: true,
       slugify: markdownItSlugify,
       permalinkBefore: false,
       permalinkClass: "direct-link",
       permalinkSymbol: "#",
       level: [1, 2, 3, 4],
     })
     .use(markdownItToc, {
       includeLevel: [2, 3],
       slugify: markdownItSlugify,
       format: function(heading) {
         return removeExtraText(heading);
       },
       transformLink: function(link) {
         // remove backticks from markdown code
         return link.replace(/\%60/g, "");
       },
     });

   mdIt.linkify.tlds(".io", false);
   eleventyConfig.setLibrary("md", mdIt);
   ```

3. Add following CSS

   ```css
   a[href].direct-link,
   a[href].direct-link:visited {
     @apply text-gray-500;
     visibility: hidden;
   }

   :focus > a[href].direct-link,
   :focus > a[href].direct-link:visited,
   :hover > a[href].direct-link,
   :hover > a[href].direct-link:visited,
   a[href].direct-link:focus,
   a[href].direct-link:focus:visited {
     visibility: visible;
   }
   ```

4. For table of content add `[[toc]]` in md file.

## Gratitude

It won't be possible without [skeleventy](https://github.com/josephdyer/skeleventy)
