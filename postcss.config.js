module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('precss'),
    require('postcss-neat')
    // require('autoprefixer'),
    // require('cssnano')({
    //   autoprefixer: false
    // })
  ]
};
