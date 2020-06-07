var path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js", //5位hash值
        // publicPath:'/dist'
    },
    module: {
        rules: [
            {
                test: /\.less$/,// .以less结尾的
                use: [
                    { loader: 'style-loader' },
                    // { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [ // 基于 postcss 下的插件
                                // require('autoprefixer')(),
                                require('postcss-cssnext')(), // css添加前缀 压缩
                                require('cssnano')({  // 压缩
                                    preset: 'default'
                                }),
                            ]
                        }
                    },
                    { loader: 'less-loader' }],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // 图片解析 转换base64编码或单独抽离图片
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].min.[ext]',// [ext]图片以什么格式
                            // 限制图片大小  <= 100kb 进行base64编码
                            // limit:100000,
                            limit: 1,
                            // 打包后的路径
                            outputPath: 'img'
                        }
                    },
                    { // 图片压缩
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    quality: [0.3, 0.6]
                                }),
                            ]
                        }
                    }
                ]
            },
            // 不能处理html中引入的图片  需要用到html-loader
            {
                test: /\.html$/,
                use: [
                    {
                        // 处理html中引入的图片
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash:5].css",
            // chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成之后的文件名
            template: './index.html', // 根据那个文件生成
            // 指定文件插入页面中
            // chunks:[],
            minify: {
                collapseWhitespace: true,  // 去掉空格
                removeComments: true  // 清理注释
            }
        }),

        new CleanWebpackPlugin(), // 每次清除上一次的打包文件
        new Webpack.HotModuleReplacementPlugin() // 热更新插件
    ],
    devServer: {
        // 提供内容的路径
        contentBase: 'dist',
        // 修改端口号
        port: '9090',
        // 开启热更新此时会刷新浏览器
        hot: true,
    }
}

// 搭建大型多页应用工程：配置环境
// 第一种 $ webpack --config webpack-dev.config.js 开发环境
// 第二种 npm run dev