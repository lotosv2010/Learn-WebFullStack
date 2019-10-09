const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const WebpackSpriteSmith = require('webpack-spritesmith');

module.exports = env => merge(common(env), {
  devtool: 'source-map',
  // mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: true
      },
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // 拷贝文件
    // new CopyWebpackPlugin([
    //   {
    //     from: resolve('src/iconfont'),
    //     to: 'iconfont'
    //   }
    // ])
    // new WebpackSpriteSmith({
    //   src: {
    //     // 图片来源
    //     cwd: path.join(__dirname, './src/assets/img'),
    //     // 处理什么图片
    //     glob: '*.jpg'
    //   },
    //   target: {
    //     // 打包到哪
    //     image: path.join(__dirname, 'dist/sprites/sprite.png'),
    //     css: path.join(__dirname, 'dist/sprites/sprite.css')
    //   },
    //   apiOptions: {
    //     cssImageRef: './sprites/sprite.png'
    //   }
    // })
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
  // 防止重复
  optimization: {
    minimize: true, // 压缩
    splitChunks: { // 代码分割
      name: true,
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        styles: {
          name: './css/styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    runtimeChunk: true
  }
})