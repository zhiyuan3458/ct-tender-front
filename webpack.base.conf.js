const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'scss'],
    alias: {
      src: resolve('src')
    }
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // node_modules/_element-ui@2.12.0@element-ui
        include: [
          resolve('src'),
          // resolve('node_modules/element-ui'),
          // resolve('node_modules/_element-ui@2.12.0@element-ui')
          resolve('node_modules/element-ui/src'),
          resolve('node_modules/element-ui/packages'),
          resolve('node_modules/_element-ui@2.12.0@element-ui/packages'),
          resolve('node_modules/_element-ui@2.12.0@element-ui/src')
        ],
        exclude: [
          resolve('node_modules/webpack-dev-server')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name]_[hash:7].[ext]'
        }
      },
      {
        // 视频加载
        test: /\.(flv|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'static/video/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
