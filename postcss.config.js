module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production'
      ? require('cssnano')({
          preset: 'default',
        })
      : false,
  ],
}
