// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  //   outputDir: './../static',
  publicPath:
    process.env.NODE_ENV === 'development'
      ? ''
      : 'https://fivepiece-1258577280.cos.ap-guangzhou.myqcloud.com/dist/',
  productionSourceMap: false,
  css: {
    sourceMap: false,
  },
  devServer: {
    // 启动时打开浏览器
    // open: true,
    // 打开浏览器时的路径
    // openPage: '/',
    // 服务端口
    port: 8999,
    // 设置代理
    // proxy: null
  },
}
