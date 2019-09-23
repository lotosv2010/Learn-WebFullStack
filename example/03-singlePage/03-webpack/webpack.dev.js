const webpack = require('webpack')
module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9001,
    overlay: true,
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}