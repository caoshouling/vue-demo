'use strict';

const TerserPlugin = require('terser-webpack-plugin');
const HappyPack = require('happypack');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');


const VueLoaderPlugin = require('vue-loader/lib/plugin');

const smp = new SpeedMeasureWebpackPlugin();

const PATHS = {
    src: path.join(__dirname, 'src')
};
//Html压缩,兼容多页面应用处理
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/module/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/src/module/main/index.js'
            const match = entryFile.match(/src\/module\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/module/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['element-ui-common','commons',pageName],
                    inject: true,//Css和js会自动注入到html
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true,
                        //删除多余的属性
                        removeRedundantAttributes: true, 
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
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.js$/,
                include: path.resolve('src'),
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            // the number of spawned workers, defaults to (number of cpus - 1) or
                            // fallback to 1 when require('os').cpus() is undefined
                            workers: 2,

                            // number of jobs a worker processes in parallel
                            // defaults to 20
                            workerParallelJobs: 50,

                            // additional node.js arguments
                            workerNodeArgs: ['--max-old-space-size=1024'],

                            // Allow to respawn a dead worker pool
                            // respawning slows down the entire compilation
                            // and should be set to false for development
                            poolRespawn: false,

                            // timeout for killing the worker processes when idle
                            // defaults to 500 (ms)
                            // can be set to Infinity for watching builds to keep workers alive
                            poolTimeout: 2000,

                            // number of jobs the poll distributes to the workers
                            // defaults to 200
                            // decrease of less efficient but more fair distribution
                            poolParallelJobs: 50,

                            // name of the pool
                            // can be used to create different pools with elsewise identical options
                            name: "my-pool"
                        }
                    },
                    'cache-loader',
                    'babel-loader',
                    //'happypack/loader' //如果不使用 "thread-loader"可以使用happypack
                    //'eslint-loader'
                ]
            },
            {
                test: /.css$/,
                use: [
                    //'vue-style-loader',
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    
                ]
            },
            {
                test: /.less$/,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',                 
                    {
                        loader: 'postcss-loader',//Css后置处理器，打包后处理
                        options: {
                            plugins: () => [
                                //浏览器兼容性的 补全前缀： IE(-ms)  火狐（-moz） 谷歌（-webkit）
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {   //屏幕尺寸适应，px自动转换rem 插件px2rem-loader
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          // optipng.enabled: false will disable optipng
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: '65-90',
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          // the webp option will enable WEBP
                          webp: {
                            quality: 75
                          }
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //打包分析插件：能通过一个网页查看打包情况，便于分析和优化
        new BundleAnalyzerPlugin(),
        //先清空再构建：避免出现很多旧文件。
        new CleanWebpackPlugin(),
        //一定要有这个插件，不然vue加载不了
        new VueLoaderPlugin(),
       
         //Css内容不变contentHash就不变
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        //删除无用的CSS属性，但是这里用了element-ui的样式会被删除导致样式出错，不知道原因，所以不启用。
        // new PurgecssPlugin({
        //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
                
        // }),
        //CSS压缩
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
       
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //       {
        //         module: 'react',
        //         entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //         global: 'React',
        //       },
        //       {
        //         module: 'react-dom',
        //         entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //         global: 'ReactDOM',
        //       },
        //     ]
        // }),
        new FriendlyErrorsWebpackPlugin(),
        function() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },
        // new BundleAnalyzerPlugin(),
        //HappyPack的使用 webpack 4 使用thread-loader代替
        // new HappyPack({
        //     // 3) re-add the loaders you replaced above in #1:
        //     loaders: [ 'babel-loader?cacheDirectory=true' ] //缓存提升速度
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('./build/library/library.json')
        // }),
        //开启模块缓存
        new HardSourceWebpackPlugin(),
        
    ].concat(htmlWebpackPlugins),
     optimization: {
        
           //分块处理
            splitChunks: {
                minSize: 0, //分离的包体积大小，即达到了多大才生效。0表示只要有引用就会打包
                cacheGroups: {
                    elementui: {
                        name: 'element-ui-common',
                        test: /element-ui/,//对于element-ui
                        chunks: 'all',
                    },
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2   //两次就会打成common命名的包
                    },
                }
            },
            // //压缩处理。 注意：分块和压缩是互斥的。
            // minimizer: [
            //             //多进程、多实例：并行压缩
            //             new TerserPlugin({
            //                 parallel: true,
            //                 cache: true //开始缓存，第二次打包更快
            //             })
            // ]
    
     },
    
    // resolve: {
    //     alias: {
    //         'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
    //         'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
    //     },
    //     extensions: ['.js'],
    //     mainFields: ['main']
    // }
    // stats: 'errors-only'
};
