'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const apiMocker = require('mocker-api');
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/module/*/index.js'));
    console.log(entryFiles);
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            // '/src/module/main/index.js'
            const match = entryFile.match(/src\/module\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `../src/module/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    mode: 'development',
    resolve: {
        alias: {
          src: path.resolve(__dirname, '../src'),
          components: path.resolve(__dirname, '../src/components'),
          api: path.resolve(__dirname, '../src/api'),
          mock: path.resolve(__dirname, '../src/mock'),
          assets: path.resolve(__dirname, '../src/assets'),
          css: path.resolve(__dirname, '../src/css'),
          module: path.resolve(__dirname, '../src/module'),
          plugin: path.resolve(__dirname, '../src/plugin'),
          routers: path.resolve(__dirname, '../src/routers'),
          store: path.resolve(__dirname, '../src/store'),
          utils: path.resolve(__dirname, '../src/utils'),
          views: path.resolve(__dirname, '../src/views'),
          fonts: path.resolve(__dirname, '../src/fonts'),
          layout: path.resolve(__dirname, '../src/layout'),
          icons: path.resolve(__dirname, '../src/icons')
        },
        extensions: ['.vue', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
                
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10k  处理图片为BASE64的格式展示，打包后的文件变大，大于limit会用file-loader打包
                           
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader',
            }
        ]
    },
    plugins: [
        //定义能在package.json中scripts使用的参数。
        new webpack.DefinePlugin({
          
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),//一定要有这个插件，不然vue加载不了
        new FriendlyErrorsWebpackPlugin()
        
    ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: '../dist',
        index:'main.html', //指定首页
        hot: true,
        stats: 'errors-only',
        historyApiFallback: true,
        before(app){
            if(process.env.MOCK == 'true'){
                console.log("开启mock服务--->");
                apiMocker(app, path.resolve(__dirname, '../src/mock/index.js'), {
                    //本地不需要代理
                    //  proxy: {
                    //     '/api/(.*)': 'https://api.github.com/'
                    //  },
                    // changeHost: true,
         });
                
            }else{
                console.log("不开启mock服务!!!");
            }
            
        },
        
    },
    devtool: 'cheap-source-map'
};
