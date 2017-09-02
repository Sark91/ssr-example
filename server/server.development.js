module.exports = (express, app) => {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);
  const history = require('connect-history-api-fallback');

  app.use(history());

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, publicPath: webpackConfig.output.publicPath, historyApiFallback: true,
  }));

  app.use(require("webpack-hot-middleware")(compiler));
};

