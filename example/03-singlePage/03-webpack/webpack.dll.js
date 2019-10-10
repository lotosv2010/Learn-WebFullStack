const path = require('path');
const webpack = require('webpack')
exports.default = {
  entry: {
    gwb: ['gwb']
  },
  output: {
    filename: './[name].dll.js',
    path: path.resolve(__dirname, 'src/dll'),
    library: '[name]' // 引用名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'src/dll/[name].json'),
      name: '[name]'
    })
  ]
}