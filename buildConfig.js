const path = require('path')

module.exports = {
  serverPort: 9003,
  paths: {
    base: path.resolve(__dirname, '.'),

    babelCache: path.resolve(__dirname, '.babel-cache'),

    dist: path.resolve(__dirname, 'dist'),

    app: {
      base: path.resolve(__dirname, 'app'),
      favicon: path.resolve(__dirname, 'app/assets/images/favicon.ico'),
      mainJs: path.resolve(__dirname, 'app/main.jsx'),
      html: path.resolve(__dirname, 'app/views/index.html'),
    },
  },
}
