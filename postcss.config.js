const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['> 1%'],
      cascade: false,
    }),
  ],
}
