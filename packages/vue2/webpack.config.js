/*
 * @Author: wangzhongjie
 * @Date: 2021-08-09 16:06:56
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-08-10 15:43:33
 * @Description:
 * @Email: UvDream@163.com
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
module.exports = {
    context: __dirname,
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.json', '.vue']
    },
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "index.min.js",
        library: '@uvdream/bytemd-plugin-vu2',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    devtool: false,
    performance: {
        hints: false,
    },
    mode: "production"
};
