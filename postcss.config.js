module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-plugin-px2rem'),
    require('postcss-salad'),
    require('postcss-neat')
  ]
};
