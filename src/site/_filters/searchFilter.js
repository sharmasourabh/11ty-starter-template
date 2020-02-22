const elasticlunr = require("elasticlunr");

module.exports = function(collection) {
  // fields in index
  var index = elasticlunr(function() {
    this.addField("title");
    this.addField("tags");
    this.addField("excerpt");
    this.setRef("id");
  });

  // loop through each page and add it to the index
  collection.forEach(page => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      tags: page.template.frontMatter.data.tags,
      excerpt: page.template.frontMatter.data.excerpt
    });
  });

  return index.toJSON();
};
