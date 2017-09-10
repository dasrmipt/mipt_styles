/**
 * Created by altair on 23.03.17.
 */

const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./base.js');

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        output: {
            filename: '[name].css',
            path: path.resolve(__dirname, '../dest/build'),
            publicPath: '/dasr/css/',
            sourceMapFilename: "sourcemaps/[file].map",
        },
        // devServer: {
        //     proxy: { // proxy URLs to backend development server
        //         '/api': 'http://localhost:8082'
        //     },
        //     contentBase: [
        //         path.join(__dirname, '../public'),
        //         path.join(__dirname, '../dest')
        //     ], // boolean | string | array, dest file location
        //     compress: false, // enable gzip compression
        //     //historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        //     hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        //     https: false, // true for self-signed, object for cert authority
        //     noInfo: false, // only errors & warns on hot reload
        //     host: "djservice.my",
        //     port: 8080
        // },
        devtool: "source-map",
        watch: true,

        plugins: [
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true,
                options: {
                    sassLoader: {
                        includePaths: [
                            './node_modules'
                        ],
                        sourceMap: true
                    }
                }
            })
        ]
    })
};
