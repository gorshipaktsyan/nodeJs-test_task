var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
console.log(__dirname);

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        publicPath: '/',
        path: __dirname,
        filename: "../public/build/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    devServer: {
        contentBase:'./',
        hot: true,
        historyApiFallback: false,
        inline: true
    },
    plugins: debug ? [] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
        ]
};
