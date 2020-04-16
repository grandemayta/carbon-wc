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
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.dirname(require.resolve('carbon-custom-elements/es')),
          path.dirname(require.resolve('lit-html')),
          path.dirname(require.resolve('lit-element')),
          path.dirname(require.resolve('@webcomponents/custom-elements')),
          // `ShadyCSS` NPM package is missing its entry point file
          path.dirname(require.resolve('@webcomponents/shadycss/scoping-shim.min.js')),
          path.dirname(require.resolve('@webcomponents/shadydom')),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                  },
                ],
              ],
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              plugins: [['@babel/plugin-transform-runtime', { version: '7.3.0' }]],
            },
          },
        ],
      },
    ],
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