/*
  A date formatter filter for Nunjucks
*/
const { format } = require("date-fns");

/**
 * Convert a JavaScript Date object into a "MMM d, yyyy" formatted date string
 * @param {Date/Page} date The date to convert, or additional taken from page object
 * @return {string} A human readable date
 */
module.exports = obj => {
  if (!obj) {
    console.warn("Date passed to dates filter was undefined or null.");
    return;
  }
  const d = obj.date ? new Date(obj.date.toUTCString()) : new Date(obj);
  return format(d, "MMM d, yyyy");
};
