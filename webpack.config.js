const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, './app');
const dist = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    bundle: [`${src}/index.js`]
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  devServer: {
    contentBase: dist,
    port: 3002,
    open: true
  },
  optimization: {
    splitChunks: {
      maxAsyncRequests: 1
    }
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', 'src']
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${src}/index.html`,
      filename: 'index.html'
    })
  ]
};