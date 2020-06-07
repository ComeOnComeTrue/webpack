var HtmlWebpackPlugin =  require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require("path");

module.exports = {
    entry: {
        index: './src/index.js',
    },
    module: {
        rules: [
          { test: /\.css$/, use:['style-loader','css-loader']  }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].bundle.js", //5倍hash值
        // publicPath:'/dist'
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html', // 生成之后的文件名
            template:'./index.html', // 根据那个文件生成
            // 指定文件插入页面中
            // chunks:[],
            minify:{
                collapseWhitespace:true,  // 去掉空格
                removeComments:true  // 清理注释
            }
        }),
        new CleanWebpackPlugin(), // 每次清除上一次的打包文件
    ],
    mode: 'development',
}
