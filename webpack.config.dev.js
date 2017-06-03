const DotenvPlugin = require('webpack-dotenv-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const buildConfig = require('./buildConfig');

module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${buildConfig.serverPort}`,
    'webpack/hot/only-dev-server',
    buildConfig.paths.app.mainJs,
  ],
  output: {
    filename: 'js/[name].js',
    path: buildConfig.paths.dist,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          buildConfig.paths.app.base,
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: buildConfig.paths.cache,
        },
      },
      {
        test: /\.scss$/,
        include: [
          buildConfig.paths.app.base,
        ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new DotenvPlugin({
      // We don't really use this as different env files for different people. Just a place to keep common
      // env variables for the project as a whole.
      sample: '.env',
      path: '.env',
    }),
    new HtmlWebpackPlugin({
      favicon: buildConfig.paths.app.favicon,
      template: buildConfig.paths.app.html,
    }),
    new webpack.HotModuleReplacementPlugin(),

    // Allows the HMR plugin to output more legible names.
    new webpack.NamedModulesPlugin(),

    // This makes our vendor bundle from node_modules modules.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),

    // This ensures that our vendor bundle name doesn't change between builds (unless the vendor contents change)
    // by extracting out the webpack bootstrap code into its own file.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
      buildConfig.paths.base,
    ],
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: buildConfig.serverPort,
  },
};
