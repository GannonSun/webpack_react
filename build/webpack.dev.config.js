const path = require("path");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    // 指定构建环境
    mode: "development",
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "./../dist/index.html"), // html模版的生成路径
            template: "public/index.html", // html模版
            inject: true, // 默认值为true, script标签位于html文件的底部
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html
        hot: true,
        contentBase: false, // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
        compress: true, // 一切服务都启用gzip压缩
        port: "8081", // 服务启动端口
        publicPath: "/", // 静态资源前缀
        proxy: {
            // 接口请求代理
        }
    }
})