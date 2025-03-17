/**
 * Sass configuration to silence deprecation warnings
 * related to Bootstrap's internal Sass functions
 */
module.exports = {
  // Silence deprecation warnings from Bootstrap
  quietDeps: true,
  // Specific load paths if needed
  loadPaths: ["node_modules"],
  // Output style
  style: "expanded",
};
