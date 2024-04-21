module.exports = require('cypress').defineConfig({  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
