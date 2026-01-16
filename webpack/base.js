const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  devtool: "eval-source-map",

  entry: path.resolve(__dirname, "../src/index.js"),

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "./",
    assetModuleFilename: "assets/[hash][ext][query]"
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist")
    },
    open: true,
    hot: true,
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },

      {
        test: [/\.vert$/, /\.frag$/],
        type: "asset/source"
      },

      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        type: "asset/resource"
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    })
  ],

  resolve: {
    extensions: [".js"]
  }
};
