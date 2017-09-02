module.exports = (moduleExport) => {
  const webpack = require('webpack');

  delete moduleExport.devtool;

  moduleExport.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
        PROD_ENV: JSON.stringify('1'),
        API_ADDRESS: JSON.stringify(process.env.API_ADDRESS),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
  );

  return moduleExport;
};