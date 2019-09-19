// https://www.cnblogs.com/lanshengzhong/p/10386986.html
// https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    proxy: {
      '/app': {
        // 需要代理的服务器地址
        target: 'http://localhost:8080/json/',
        // websocket
        ws: true,
        // 是否允许跨域
        changeOrigin: true,
        // 重写
        pathRewrite: {
          '/app': '/'
        }
      }
    }
  },
  configureWebpack: (config)=>{
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton.js'),
        },
      },
      minimize: true,
      quiet: true,
    })) 
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      sass: {
        data: `@import '@/assets/style/index.scss';`
      }
    }
  }
}
