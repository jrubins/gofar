const DotenvPlugin = require("webpack-dotenv-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const buildConfig = require("./buildConfig");

module.exports = {
  context: __dirname,
  devServer: {
    clientLogLevel: "error", // The default value for this outputs too much in DevTools.
    contentBase: buildConfig.paths.src.base,
    historyApiFallback: {
      disableDotRule: true
    },
    host: "0.0.0.0",
    hot: true,
    port: buildConfig.serverPort
  },
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${buildConfig.serverPort}`,
    "webpack/hot/only-dev-server",
    buildConfig.paths.src.mainJs
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [buildConfig.paths.src.base],
        loader: "babel-loader",
        options: {
          cacheDirectory: buildConfig.paths.babelCache
        }
      },
      {
        test: /\.scss$/,
        include: [buildConfig.paths.src.base],
        use: ["style-loader", "css-loader", "sass-loader"]
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
    chunkFilename: "js/[name].js",
    filename: "js/[name].js",
    path: buildConfig.paths.dist,
    publicPath: "/"
  },
  plugins: [
    // We don't really use this as different env files for different people. Just a place to keep common
    // env variables for the project as a whole.
    new DotenvPlugin({
      allowEmptyValues: true,
      path: ".env",
      sample: ".env"
    }),
    new HtmlWebpackPlugin({
      favicon: buildConfig.paths.src.favicon,
      // "inject: true" places all JavaScript resources at the bottom of the body element.
      inject: true,
      template: buildConfig.paths.src.html
    }),
    new webpack.HotModuleReplacementPlugin(),

    // Allows the HMR plugin to output more legible names.
    new webpack.NamedModulesPlugin(),

    // Ignore locales from moment.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", buildConfig.paths.base]
  }
};
