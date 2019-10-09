const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const WebpackSpriteSmith = require('webpack-spritesmith');

module.exports = env => merge(common(env), {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
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
  ]
})