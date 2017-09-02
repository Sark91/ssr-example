const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpackModifier = require(`./webpack.config.${process.env.NODE_ENV || 'production'}`);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
        exclude: excludeFile,
      },
      {
        test: includeFileExtension,
        use: ['babel-loader'],
        exclude: excludeFile,
      },
    ],
  },
  resolve: {
    modules: [ process.env.NODE_PATH || 'node_modules', 'node_modules' ],
    extensions: ['.js', '.json', '.html', '.scss', '.css'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: process.env.NODE_ENV === 'development',
    }),
  ],
};

moduleExport = webpackModifier(moduleExport);

moduleExport.entry.push('./src/index.js');

moduleExport.plugins.push(
  new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
);

module.exports = moduleExport;
