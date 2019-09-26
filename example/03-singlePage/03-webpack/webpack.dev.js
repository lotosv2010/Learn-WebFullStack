const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = env => merge(common(env), {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9001,
    hot: true,
    overlay: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/([-~]+)/,
          to: function(context) {
            return './' + context.match[1] + '.html'
          }
        }
      ]
    }
  },
  plugins: [
    // 热替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})