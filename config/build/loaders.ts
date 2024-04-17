import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { ModuleOptions } from 'webpack';

import type { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { isDev } = options;

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const stylesLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module\.s[ac]ss$/i,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[local]--[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    };

    const svgLoader = {
        test: /\.svg$/,
        use: '@svgr/webpack',
    };

    const fileLoader = {
        test: /\.(png|jpg|jpeg)$/i,
        loader: 'url-loader',
        type: 'javascript/auto',
    };

    return [
        typescriptLoader,
        stylesLoader,
        svgLoader,
        fileLoader,
    ];
}
