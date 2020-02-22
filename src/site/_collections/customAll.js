module.exports = collection => {
  const all = collection.getAll();
  return all.filter(function(page) {
    return !page.data.hidden;
  });
};