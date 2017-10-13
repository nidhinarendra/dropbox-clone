var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.jpg'],
    moduleExtensions: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot'],
        include: path.join(__dirname, 'public')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-3']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
