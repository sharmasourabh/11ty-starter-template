module.exports = collection => {
  const blogs = collection.getFilteredByTag("blog");
  for (let i = 0; i < blogs.length; i++) {
    const prevPost = blogs[i - 1];
    const nextPost = blogs[i + 1];

    blogs[i].data["prevPost"] = prevPost;
    blogs[i].data["nextPost"] = nextPost;
  }
  return blogs.reverse();
};
