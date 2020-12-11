const path = require('path');

module.exports = {
    // 入口
    entry: {
        app: "./src/index"
    },
    // 出口
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].[fullhash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 解析扩展
        alias: {
            '@': path.join(__dirname, '../', 'src') // 在项目中使用@符号代替src路径
        }
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 屏蔽不需要处理的文件或者文件夹
                loader: 'babel-loader', // loader名称
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader', // 创建style标签
                    },
                    {
                        loader: 'css-loader', // 转换css
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader', // 编译 less -> css
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader包含file-loader, 小于10000B的图片用base64方式引入，否则用路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(wodd2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}