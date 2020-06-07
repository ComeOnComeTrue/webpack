const HtmlWebpackPlugin = require("html-webpack-plugin")
var { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        other: "./src/other.js"
    },
    output: {
        filename: "js/[name].[chunkhash:5].js",
        publicPath: "/" // 解决路径问题
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader?modules"]
            },
            {
                test: /\.jpg$/, use: {
                    loader: "file-loader",
                    options: {
                        name: "img/[hash:5].[ext]"
                    }
                }
            }
        ]
    },
    devServer: {
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:5].css"
        })
    ]
}