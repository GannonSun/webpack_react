const path = require("path");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    // 指定构建环境
    mode: "production",
    // 插件
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
})