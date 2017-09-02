const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpackModifier = require(`./webpack.config.${process.env.NODE_ENV || 'production'}`);

const includeFileExtension = /\.jsx?$/;
const excludeFile = /node_modules/;

let moduleExport = {
  entry: [
    'babel-polyfill',
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './bundle'),
    publicPath: `http://localhost:${process.env.PORT}/`,
  },
  module: {
    rules: [
      {
        test: includeFileExtension,
        use: ['babel-loader'],
        exclude: excludeFile,
      },
    ],
  },
  resolve: {
    modules: [ process.env.NODE_PATH || 'node_modules', 'node_modules' ],
    extensions: ['.js', '.json', '.html'],
  },
  plugins: [],
};

moduleExport = webpackModifier(moduleExport);

moduleExport.entry.push('./src/index.js');

moduleExport.plugins.push(new HtmlWebpackPlugin({ template: './src/assets/index.html' }));

module.exports = moduleExport;
