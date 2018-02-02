module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('cssnano')
  ]
}