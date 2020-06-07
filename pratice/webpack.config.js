// var path = require('path');
// module.exports = {
//     entry: { // 多个入口
//         index: './src/index.js',
//         app: './src/app.js'
//     },
//     output: { 
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].bundle.js'  
//     },
//     mode: 'development'   // 模式
// }



var htmlPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口
    //  单个入口文件 字符串形式
    // entry: './src/index.js',
    // 对象形式  多个入口
    entry: {
        index: './src/index.js',
        // app:'./src/app.js',
    },
    // 输出  最低要求为一个对象  单个入口文件
    // output:{
    //     // 输出文件名称
    //     filename:'bundle.js',
    //     // 输出路径  必须为绝对路径
    //     path:'/dist'
    // },
    // 多个入口
    output: { // 输出
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader'] }
        ]
    },
    // 模式
    mode: 'development',

    // 插件
    plugins:[
        new htmlPlugin(),
        // new HtmlWebpackPlugin(),

    ],

}




// var htmlPlugin = require('html-webpack-plugin');
// var path = require('path');
// module.exports = { // 暴露接口方式之一
//     entry: { // 多个入口
//         index: './src/index.js',
//         // app:'./src/app.js',
//     },
//     output: { // 出口、输出
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].bundle.js',
//     },
//     module: {// 模块 
//         rules: [
//             //  loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
//             //test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
//             //use 属性，表示进行转换时，应该使用哪个 loader。
//             { test: /\.css$/, use: ['style-loader','css-loader'] }
//         ]
//     },
//     mode: 'development', // 模式 development开发,未压缩 或 production上线,压缩
//     plugins:[  // 插件
//         new htmlPlugin(),
//     ],
// }