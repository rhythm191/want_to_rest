const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let isProduction = process.env.NODE_ENV === "production";

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === "production";

  const setting = {
    context: path.join(__dirname, "src"),
    entry: {
      background: "./background.js",
      content_scripts: "./content_scripts.js",
      popup: "./popup.js",
      popup_style: "./popup.scss"
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        {
          test: /\.scss$/,
          use: [
            IS_PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    performance: {
      hints: false
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    devtool: false,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          config: {
            path: "./postcss.config.js"
          }
        }
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].min.css",
        chunkFilename: "[id].min.css"
      })
    ]
  };

  return setting;
};
