const path = require("path");
const baseWebpackConfig = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  // 指定构建环境
  mode: "production",
  // 插件
  plugins: [
    new CleanWebpackPlugin(), // 在打包的时候会删除之前的打包目录
  ],
});
