// https://www.cnblogs.com/lanshengzhong/p/10386986.html
// https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
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
  css: {
    loaderOptions: {
      sass: {
        data: `@import '@/assets/style/index.scss';`
      }
    }
  }
}
