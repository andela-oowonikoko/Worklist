const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');

const dotenvPlugin = new DotEnvPlugin({
  path: '.env',
});

module.exports = {
  entry: [
    './client/src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports?jQuery=jquery,$=jquery,hammerjs'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?root=.'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'client/dist/'),
    publicPath: '/app/',
    filename: 'bundle.js'
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    jquery: 'jQuery'
  },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  plugins: [
    dotenvPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/bundle.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    })
  ]
};
