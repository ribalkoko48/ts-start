/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('./package.json');

module.exports = (_, { mode }) => {
    const devMode = mode === 'development';

    return {
        entry: './src/index.tsx',

        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.min.js',
            publicPath: '/'
        },

        devServer: {
            historyApiFallback: true,
            compress: true,
            port: 3000
        },

        devtool: 'source-map',

        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: ['file-loader'],
                },
                {
                    test: /\.(js|jsx)?$/,
                    loader: 'babel-loader',
                },

                {
                    test: /\.(ts|tsx)?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.(scss|css)?$/,
                    exclude: /\.module.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
                },
                {
                    test: /\.module.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                esModule: true,
                                modules: {
                                    namedExport: true,
                                },
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: true,
                                    localIdentName: '[path]--[local]__[hash:base64:5]',
                                },
                            },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [{ from: 'public', to: 'public' }],
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(packageJson.version),
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
    };
};
