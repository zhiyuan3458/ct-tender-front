const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  /**
   * 对css进行合并与压缩
   */
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              name: 'static/css/[name]_[hash:7].[ext]'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/prod')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        // 是否移除注释 默认false
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        // 是否移除属性的引号 默认false
        removeAttributeQuotes: true,
        chunksSortMode: 'dependency'
      }
    })
  ]
});
