import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependecyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
    DefinePlugin,
    HotModuleReplacementPlugin,
    ProgressPlugin,
    type WebpackPluginInstance
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

export function buildPlugins(
    {
        paths,
        isDev,
        apiUrl,
        project,
    }: BuildOptions
): WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.HTML,
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: isDev,
            __API__: apiUrl,
            __PROJECT__: project,
        }),
        new HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
        new CircularDependecyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }
    if (isDev && process.env.analyze) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
