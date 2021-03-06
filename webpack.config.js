var webpack = require('webpack');
var path = require('path');
//生成HTML文件
var HtmlwebpackPlugin = require('html-webpack-plugin');
//CSS 分离
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//清楚缓存
var CleanWebpackPlugin = require('clean-webpack-plugin');

//定义了一些文件夹的路径

var rootPath = path.resolve(__dirname);

var appPath = path.resolve(rootPath, 'app');
var buildPath = path.resolve(rootPath, 'build');
var publicPath = path.resolve(rootPath, 'public');

var currentTarget = process.env.npm_lifecycle_event;

var env = process.env.NODE_ENV;


module.exports = {
    //页面入口配置文件
    entry: [
        './app/js/entry/index.js'
    ],

    //设置导出路径
    output: {
        path: buildPath,
        // publicPath: publicPath,
        filename: '[name].js'
    },
    cache: true, //开启缓存,增量编译
    // devtool: 'source-map', //生成 source map文件
    stats: {
        colors: true, //打印日志显示颜色
        reasons: true //打印相关模块被引入
    },
    //模块配置
    module: {
        // 预加载器
        loaders: [
            // .js 文件使用 jsx-loader 来编译处理
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                // loader: ['babel'],
                loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-3'],
                // query: {
                //     presets: ['es2015', 'react']
                // }
            },

            //.css 文件使用 style-loader 和 css-loader 来处理
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },

            { 
                test: /\.less$/, 
                loader: 'style-loader!css-loader!less-loader' 
            },

            //.img 文件使用 style-loader 和 css-loader 来处理
            {
                test: [/\.png/, /\.jpg/, /\.gif/],
                loader: 'file-loader?name=images/[name].[ext]&limit=1024'
            }
        ]
    },

    //指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.scss']
    },

    //定义需要使用的插件
    plugins: [
        //CSS 分离
        new ExtractTextPlugin("[name].css", {allChunks: true}),

        //生成HTML 模板
        new HtmlwebpackPlugin({
            mobile: true,
            title: '邻米',
            filename: buildPath + '/index.html',
            template: path.resolve(rootPath, './app/templates/index.ejs'),
        }),

        //全局开启代码热替换
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoErrorsPlugin(),
        //配置webpack传递的参数
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        //代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            // sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
            // mangle: true
        })
    ],

    //热更新
    devServer: {
        contentBase:'./build/',
        historyApiFallback: true,

        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        host: "localhost", // Defaults to `localhost`   process.env.HOST
        port: "8989",  // Defaults to 8080   process.env.PORT
    }
}
