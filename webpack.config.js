const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {DefinePlugin} = require('webpack');
//добавить DefinePlugin из webpack для настройки VUE_DEV_TOOL


const isDev = process.env.NODE_ENV === 'development';
const IsProd = !isDev;

const pathSrc = './web/webpack/src/';
const pathDist = './web/webpack/dist/';

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, pathSrc),
    },
    output: {
        path: path.resolve(__dirname, pathDist),
        filename: '[name].js',
        clean: true,
    },
    devtool: isDev ? 'source-map': false,
    plugins: [
        new CleanWebpackPlugin(),
        new CssMin({
            filename: '[name].css',
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        })
    ],
    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test:/\.scss$/i,
                use: [
                    CssMin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            //Шрифты
            {
                test: /\.ttf$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name][ext]'
                }
            },
            //vue
            {
                test: /\.vue$/,
                use:'vue-loader'
            }
        ],
    },
}