const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const buildConfig = require("./buildConfig");

module.exports = {
  bail: true,
  context: __dirname,
  entry: {
    main: buildConfig.paths.src.mainJs
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [buildConfig.paths.src.base],
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        include: [buildConfig.paths.src.base],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?importLoaders=1",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "all",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  output: {
    chunkFilename: "js/[name].[chunkhash].js",
    filename: "js/[name].[chunkhash].js",
    path: buildConfig.paths.dist,
    publicPath: "/"
  },
  plugins: [
    // This is a shorthand plugin for the DefinePlugin.
    new webpack.EnvironmentPlugin([
      "APP_ENV",
      "GA_PROPERTY",
      "INSPECTLET_APP_ID",
      "NODE_ENV"
    ]),
    new HtmlWebpackPlugin({
      favicon: buildConfig.paths.src.favicon,
      // "inject: true" places all JavaScript resources at the bottom of the body element.
      inject: true,
      template: buildConfig.paths.src.html
    }),

    // Ignore locales from moment.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Need this to preserve the IDs of Webpack modules between builds. Otherwise having new imports in the main bundle
    // will cache-bust the vendor bundle.
    new webpack.HashedModuleIdsPlugin(),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    }),

    new CopyWebpackPlugin([
      {
        from: "./_redirects"
      }
    ])
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", buildConfig.paths.base]
  }
};
