const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/app.js',
    app2: './src/app2.js'
  },
  output: {
    filename: './js/[name].[hash:6].js',
    path: path.resolve(__dirname ,'dist')
  },
  module: {
    rules: [
      {
        // test: /\.js$/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {}
        // }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}