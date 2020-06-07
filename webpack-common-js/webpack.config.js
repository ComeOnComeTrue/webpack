var Webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        // 代码提取针对多entry  单页面配合代码懒加载实现
        pageA:'./src/pageA.js',
        pageB:'./src/pageB.js',
    },
    output: {  
        // __dirname 当前运行目录 
        path:path.resolve(__dirname,"dist"),
        filename:"[name].bundle.js",
        // 新chunk生成打包的文件名
        chunkFilename:"[name].chunk.js"
    },
    // webapck4新特性 用于打包多入口文件的公共代码替代了wbepack3中的CommonsChunkPlugin
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                // 自定义缓存组
                common: {
                    // name 提取文件名  
                    name: "common",
                    // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)
                    // 提取代码的范围   async创建异步公共代码流
                    chunks: "all",
                    // minChunks公共代码出现最少次数 
                    minChunks:2,
                    // 形成一个代码块需要的最小体积 默认30kb
                    minSize: 1,
                    // 设置打包顺序的优先级
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    // 匹配满足条件进行打包
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    // 设置打包顺序
                    priority: 10
                }
            }
        }
    },
    mode:"development"
}