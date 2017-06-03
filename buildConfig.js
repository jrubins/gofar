const path = require('path');

module.exports = {
  serverPort: 9005,
  paths: {
    base: path.resolve(__dirname, '.'),

    cache: path.resolve(__dirname, '.cache'),

    dist: path.resolve(__dirname, 'dist'),

    app: {
      base: path.resolve(__dirname, 'app'),
      favicon: path.resolve(__dirname, 'app/assets/images/favicon.ico'),
      mainJs: path.resolve(__dirname, 'app/main.js'),
      html: path.resolve(__dirname, 'app/views/index.html'),
    },
  },
};
