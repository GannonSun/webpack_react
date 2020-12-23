const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const devConfig = require("./build/webpack.dev.config.js");
const prodConfig = require("./build/webpack.prod.config.js");
const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  module.exports = devConfig;
} else {
  if (process.env.BUILD_REPORT) {
    // npm run analyz 打包分析
    module.exports = merge(prodConfig, {
      plugins: [new BundleAnalyzerPlugin()], // 在打包结束的时候，会启动启动一个服务在浏览器查看打包的大小和包含的内容
    });
  } else {
    module.exports = prodConfig;
  }
}
