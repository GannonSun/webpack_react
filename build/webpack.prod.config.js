const path = require("path");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    // 指定构建环境
    mode: "production",
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "./../dist/index.html"), // html模版的生成路径
            template: "public/index.html", // html模版
            inject: true, // 默认值为true, script标签位于html文件的底部
            hash: true, // 生产环境上打包加上hash, 解决部署新版本缓存问题; 开发环境不加hash是为了打包速度
            // html文件进行压缩
            minify: {
                removeComments: true, // 去注释
                collapseWhitespace: true, // 压缩空格
                removeAttributeQuotes: true // 去除属性引用
            }
        })
    ],
})