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
            path: path.resolve(__dirname, '../dest/'),
            filename: '[name].[hash].min.js',
            publicPath: '/frontend/',
            sourceMapFilename: '[name].map'
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // new webpack.optimize.UglifyJsPlugin({
            //     beautify: false,
            //     mangle: {
            //         screw_ie8: true,
            //         keep_fnames: true
            //     },
            //     compress: {
            //         screw_ie8: true
            //     },
            //     comments: false
            // })
        ]
    })
};
