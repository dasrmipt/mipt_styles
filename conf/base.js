/**
 * Created by altair on 23.03.17.
 */


const baseImgUrl = "/dasr/css/";

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//     template: 'src/html/index.html',
//     chunks: ['index'],
//     filename: path.resolve(__dirname, '../public/index.html'),
//     inject: 'body'
// });

const ExtractCSSTextPlugin = new ExtractTextPlugin("style1.css");
const ExtractSCSSTextPlugin = new ExtractTextPlugin("style2.css");

module.exports = function () {
    return {
        entry: {
            'index': 'dasr_style.scss',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {importLoaders: 1},
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    debug: true,
                                    root: path.resolve(__dirname, "../src/")
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {parser: 'postcss-scss'},
                            },
                            {
                                loader: 'sass-loader',
                                // options: {outputStyle: 'compressed'},
                            },
                        ]
                    }),
                    // loader: 'style!css!sass?outputStyle=compressed'
                },
                {
                    test: /\.css$/,

                    use: ['style-loader',

                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1}
                        },
                        'postcss-loader',
                        // 'sass-loader',
                    ],


// loader: 'style!css'
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]',
                                publicPath: baseImgUrl,

                            }
                        }]
                }

            ],
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve(__dirname, "../src/scss/"),
            ],
            alias:
                {
                    // Styles: path.resolve(__dirname, "../src/css"),
                    Images: path.resolve(__dirname, "../src/images"),
                }
            ,
            extensions: [".js", ".scss", ".css", ".sass"],
        }
        ,
        resolveLoader: {
            moduleExtensions: ["-loader"]
        }
        ,
        plugins: [
            // HtmlWebpackPluginConfig,
            // new HtmlWebpackPlugin({
            //     template: 'src/html/main.html',
            //     chunks: ['auth'],
            //     filename: path.resolve(__dirname, '../public/main.html'),
            //     inject: 'body'
            // }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    sassLoader: {
                        includePaths: [
                            './node_modules',
                            path.resolve(__dirname, "../src/scss/"),
                        ]
                    }
                }
            }),
            // new BundleTracker({path: __dirname, filename: '../src/webpack-stats.json'}),
            new webpack.NoEmitOnErrorsPlugin(),
            // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
            // ExtractCSSTextPlugin,
            // ExtractSCSSTextPlugin,
            new ExtractTextPlugin('[name].css'),
        ],

    }

}
