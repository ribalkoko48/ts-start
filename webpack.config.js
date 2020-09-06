const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJson = require("./package.json");

module.exports = (_, { mode }) => ({
  entry: "./src/index.tsx",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.min.js"
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss?$/,
        exclude: /\.module.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      },
      {
        test: /\.module.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: mode === "development",
              esModule: true,
              modules: {
                namedExport: true
              }
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: true,
                localIdentName: "[path]--[local]__[hash:base64:5]"
              }
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version)
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
});