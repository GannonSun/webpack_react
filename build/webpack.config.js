const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    // 指定构建环境
    mode: "development",
    // 入口
    entry: {
        app: "./src/index"
    },
    // 出口
    output: {
        path: resolve("../dist"),
        filename: "js/[name].[fullhash].js", // fullhash chunkhash contenthash
        publicPath: "/" // 打包后的资源访问路径前缀
    },
    // 模块
    module: {

    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolve('./../dist/index.html'), // html模版的生成路径
            template: 'public/index.html', // html模版
            inject: true, // 默认为true, script标签位于html文件的body底部
            hash: true, // 在打包的资源插入html会加上hash
            // 对html文件进行压缩
            minify: {
                removeComments: true, // 去注释
                collapseWhitespace: true, // 压缩空格
                removeAttributeQuotes: true // 去除属性标签对引号 ex: <p id="test" /> 输出 <p id=test />
            }
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {

    }
}