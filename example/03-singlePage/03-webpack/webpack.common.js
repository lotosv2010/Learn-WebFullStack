const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJS = require('uglify-es');
// const CopyWebpackPlugin = require('copy-webpack-plugin');


function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = function(env, arg) {
  // 判断是否是开发模式
  const devMode = env === 'development';
  const config = {
    entry: {
      app: './src/js/app.js',
      // app2: './src/js/app2.js'
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'eslint-loader',
              options: {
                formatter: require('eslint-friendly-formatter')
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: devMode ? 'style-loader': MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // require('postcss-sprites')(),
                  require('autoprefixer')({
                    'overrideBrowsersList': [
                      '>1%', 'last 2 versions'
                    ]
                  }),
                  require('postcss-cssnext')
                ]
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              // publicPath: 'assets/img',
              limit: 5000
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // require('imagemin-pngquant')({
                //   speed: 2 // 1-11
                // }),
                // require('imagemin-mozjpeg')({
                //   quality: 10 // 1-100
                // })
              ]
            }
          }
        ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(csv|tsv)$/,
          use: [
            'csv-loader'
          ]
        },
        {
          test: /\.xml$/,
          use: [
            'xml-loader'
          ]
        },
        {
          test: /.\html$/,
          use: {
            loader: 'html-loader'
          }
        }
      ]
    }
  }
  return config
}