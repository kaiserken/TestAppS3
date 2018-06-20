var webpack = require("webpack");
const Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR = [
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "semantic-ui-react",
  "axios",
  "moment",
];

module.exports = {
  mode:"production",
  entry: {
    ["TestAppS3"]: './src/index.js',
    vendor: VENDOR
  },
  output: {
    path:        Path.join(__dirname, 'build/TestAppS3'),
    publicPath:  '/TestAppS3',
    filename:    '[name].[hash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  //devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test:/\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader'
          }
        ],

      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
    }),
  ],




};
