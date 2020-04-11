// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    publicPath: './',  // 基本路径
    productionSourceMap: false,
    // // 修改打包后js文件名
    // configureWebpack: { // webpack 配置
    //     output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
    //         filename: `api/js/[name].[contenthash:8].js`,
    //         chunkFilename: `api/js/[name].[contenthash:8].js`,
    //
    //     },
    //     // 修改打包后css文件名
    //     plugins: [
    //         new MiniCssExtractPlugin({
    //             filename: `api/css/[name].[contenthash:8].css`,
    //             chunkFilename: `api/css/[name].[contenthash:8].css`,
    //         })
    //     ]
    // }
}