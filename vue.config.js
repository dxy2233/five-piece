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
    sourceMap: false
  }
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // },
}
