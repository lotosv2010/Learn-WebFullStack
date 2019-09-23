const path = require('path')
const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: './src/app.js',
    app2: './src/app2.js'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname ,'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertInto: '.color-blue',
              // singleton: true,
              // transform: './transform.js'
            }
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true
              modules: {
                // localIdentName: '[path][name]_[local]'
                localIdentName: '[local]'
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    'overrideBrowsersList': [
                      '>1%', 'last 2 versions'
                    ]
                  }),
                  require('postcss-cssnext')
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].min.css'
    })
  ]
}