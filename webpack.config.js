
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development", // production
    devtool: "source-map", // 调试时显示源代码 在线上环境使用 devtool: 'cheap-source-map'
    entry: {
        main: "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js", //5位hash值
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { // 让css里的图片路径正确
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { 
                            ident: 'postcss',
                            plugins: [ // 基于 postcss 下的插件
                                require('autoprefixer')(),  // css添加前缀 压缩
                                require('cssnano')({  // 压缩
                                    preset: 'default' 
                                }), 
                            ]
                        }
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    // {
                    //     loader: "file-loader",
                    //     options: {
                    //         name: "images/[name].[hash:5].[ext]"
                    //     }
                    // },
                    {
                        loader: "url-loader",
                        options: {
                            // limit: false //不限制任何大小，所有经过loader的文件进行base64编码返回
                            limit: 10 * 1024, //只要文件不超过 10*1024 字节，则使用base64编码，否则，交给file-loader进行处理
                            name: "images/[name].[hash:5].[ext]",
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
            // {
            //     test: /\.(eot|woff|woff2|ttf)/,
            //     use: "url-loader"
            // },
            // 不能处理html中引入的图片  需要用到html-loader
            {
                test: /\.html$/,
                use: [
                    {
                        // 处理html中引入的图片
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        // Tag name
                                        tag: 'img',
                                        // Attribute name
                                        attribute: 'src',
                                        // Type of processing, can be `src` or `scrset`
                                        type: 'src',
                                    },
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/, use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "@babel/plugin-transform-runtime", // 用于提供一些公共的API，这些API会帮助代码转换
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成之后的文件名
            template: './src/index.html', // 根据哪个文件生成
            // 指定入口文件插入页面中 html页面中引入js文件a和b 引入块
            // chunks:['a','b'],默认是'all'引入全部入口文件
            minify: {
                collapseWhitespace: true,  // 去掉空格
                removeComments: true  // 清理注释
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name]-[hash:5].css",
            // chunkFilename: "[id].css"
        }),
    ],
    devServer: {
        open: true,// 自动打开浏览器窗口
        port: '9090',// 修改端口号
        hot: true,
        proxy: { // 代理规则
            "/api": {// 当请求头包含/api 就会把协议和地址改成下面的地址
                target: "http://yuanjin.tech:5100", 
                changeOrigin: true //更改请求头中的host和origin
            }
        },
    },
    stats: { // 配置控制台 可写到devServer外
        modules: false, // 不输出模块的代码
        colors: true // 控制台代码加颜色
    }
}