const path = require("path");
const webpack = require("webpack");
const appConfig = require("./app.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const publicPath = getPublicPath();
const outputPath = isDev ? "" : appConfig.relativePrefix;

function getPublicPath() {
  if (appConfig.prodPublicPath === "./") {
    return "../";
  } else {
    return appConfig.absolutePrefix;
  }
}

// 未开启 css module 的 loader
const cssLoader = [
  {
    loader: "style-loader",
  },
  {
    loader: "css-loader",
  },
  {
    loader: "less-loader", // 编译 less -> css
  },
];
// 开启 css module 的 loader
const cssModulesLoader = JSON.parse(JSON.stringify(cssLoader));
cssModulesLoader[1] = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[path][name]__[local]--[hash:base64:5]",
    },
  },
};

module.exports = {
  // 入口
  entry: {
    app: ["react-hot-loader/patch", "./src/index"],
  },
  // 出口
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: outputPath + "js/[name].[fullhash].js",
    publicPath: appConfig.prodPublicPath || "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"], // 解析扩展
    alias: {
      "@": path.join(__dirname, "../", "src"), // 在项目中使用@符号代替src路径
    },
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 屏蔽不需要处理的文件或者文件夹
        loader: "babel-loader", // loader名称
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader", // 创建style标签
          },
          {
            loader: "css-loader", // 转换css
          },
        ],
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /css_modules/, // 只要匹配到了这个，就是用css modules，
            use: cssModulesLoader.filter(Boolean),
          },
          {
            use: cssLoader.filter(Boolean),
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240, // url-loader包含file-loader, 小于10240B的图片用base64方式引入，否则用路径的方式导入
          name: "[name].[hash:7].[ext]",
          publicPath: publicPath + "static/imgs/", // 引用路径 指打包后对静态资源引用的位置
          outputPath: outputPath + "static/imgs/", // 输出路径 指打包后具体在dist下的文件位置
        },
      },
      {
        test: /\.(wodd2?|eot|ttf|otf)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash:7].[ext]",
          publicPath: publicPath + "static/fonts/",
          outputPath: outputPath + "static/fonts/",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./../dist/index.html"), // html模版的生成路径
      template: "public/index.html", // html模版
      templateParameters: {
        appPrefix: isDev ? "/" : appConfig.prodPublicPath + outputPath,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: outputPath + "static",
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
  ],
};
