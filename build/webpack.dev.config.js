const path = require("path");
const common = require("./webpack.base.config.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    publicPath: "/",
    compress: true,
    port: 9000,
  },
});
