import { defineConfig } from "cypress";

export default defineConfig({
  component: {
module.exports = require('cypress').defineConfig({  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
