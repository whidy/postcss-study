/* 此段作为postcss-cli的介绍使用 */
// module.exports = {
//   parser: 'sugarss',
//   plugins: [
//     require('autoprefixer')
//   ]
// }

/* 此段作为webpack配合使用 参考 https://webpack.js.org/loaders/postcss-loader/ */
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}