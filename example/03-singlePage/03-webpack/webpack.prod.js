const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ]
})