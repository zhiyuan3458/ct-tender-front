'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    proxy: {
      // 陶玉琪 http://192.1.40.80:8811
      // 叶冠宏 http://192.1.40.30:8080
      // 192.1.80.36:30700
      // 模拟数据：192.1.40.110:8811
      '/api': {
        target: 'http://192.1.40.58:8811/',
        changeOrigin: true,
        pathRewrite: {
          // http://localhost:8083/base
          '^/api': ''
        }
      }
    },
    host: '0.0.0.0',
    port: 8086,
    hot: true,
    hotOnly: true,
    disableHostCheck: true,
    /* index.html的路径 */
    contentBase: false,
    compress: true,
    clientLogLevel: 'warning',
    // 若编译过程中有错误，显示到网页上,便于定位错误,包括了eslint规范的错误也显示出来
    // overlay: {
    //   errors: true
    // },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') }
      ]
    }
  },
  module: {
    rules: [
      {
        /* 加sourcemap才知道对应哪个css */
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
