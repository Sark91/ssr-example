module.exports = (express, app) => {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require("webpack-hot-middleware")(compiler));
};

