module.exports = (moduleExport) => {
  const webpack = require('webpack');

  moduleExport.devtool = 'source-map';

  moduleExport.entry.push('webpack-hot-middleware/client');

  moduleExport.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('development'),
        PROD_ENV: JSON.stringify('0'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  );

  return moduleExport;
};