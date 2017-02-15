const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = process.env.PORT || 8080
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(to) {
  return path.resolve(__dirname, to)
}

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', './src/index'],
  devServer: {
    host: '0.0.0.0',
    port,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
      sourceMap: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].[name].css'),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      minRatio: 0.8
    }),
  ],
  output: {
    path: resolve('../dist'),
    filename: '[hash].[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css?minimize']),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
