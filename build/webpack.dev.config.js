const path = require("path");
const ip = require("ip").address(); // 自动获取本机ip
const appConfig = require("./app.config");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isHubei = process.env.PLACE === "hubei";

module.exports = webpackMerge.merge(baseWebpackConfig, {
  // 指定构建环境
  mode: "development",
  // 插件
  plugins: [],
  // 开发环境本地启动的服务配置
  devServer: {
    // host: ip, // 是否可以ip访问
    // disableHostCheck: true, // 是否可以ip访问
    historyApiFallback: {
      index: appConfig.absolutePrefix + "index.html",
    }, // 当找不到路径的时候，默认加载index.html
    open: true,
    openPage: appConfig.relativePrefix,
    hot: true,
    contentBase: false, // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
    compress: true, // 一切服务都启用gzip压缩
    port: "8081", // 服务启动端口
    proxy: {
      // 接口请求代理
      "/api": {
        // target: "http://amr-zhjg-portal.z.digitalcnzz.com:11367/pcDev",
        target: "http://scjg.hubei.gov.cn/ell/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
