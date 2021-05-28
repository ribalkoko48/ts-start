/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const packageJson = require('./package.json');

module.exports = (env, { mode }) => {
    const devMode = mode === 'development';

    return {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
        },

        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.[hash].min.js',
            publicPath: '/',
        },

        devServer: {
            historyApiFallback: true,
            compress: true,
            port: 3000,
        },

        devtool: 'source-map',

        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf)$/i,
                    use: [{
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                        },
                        loader: 'file-loader',
                    }],
                },
                {
                    test: /\.(ts|tsx|js|jsx)?$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
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
                            loader: 'css-loader?url=false',
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
                patterns: [
                    { from: 'public/favicon.ico', to: 'public/favicon.ico' },
                ],
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
