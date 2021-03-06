const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      {from:'assets'},
      {from:'lib'} 
    ]), 
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
};