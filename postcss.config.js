const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['> 5%'],
      cascade: false,
    }),
  ],
}
