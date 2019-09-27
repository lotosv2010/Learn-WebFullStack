const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      app: './src/app.js',
      app2: './src/app2.js'
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
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: devMode ? 'style-loader': MiniCssExtractPlugin.loader
            },
            'css-loader',
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
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
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
        }
      ]
    },
    plugins: [
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
        filename: './css/style.css'
      }),
      // 拷贝文件
      // new CopyWebpackPlugin([
      //   {
      //     from: resolve('src/iconfont'),
      //     to: 'iconfont'
      //   }
      // ])
    ],
    // 防止重复
    optimization: {
      splitChunks: {
        cacheGroups: {
          // styles: {
          //   name: 'styles',
          //   test: /\.css$/,
          //   chunks: 'all',
          //   enforce: true,
          // },
        },
      },
    }
  }
  return config
}