import type { ModuleOptions } from 'webpack';

import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import type { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { isDev } = options;

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const stylesLoader = buildCssLoader(isDev);

    const svgLoader = buildSvgLoader();

    const fileLoader = {
        test: /\.(png|jpg|jpeg)$/i,
        loader: 'url-loader',
        type: 'javascript/auto',
    };

    const babelLoader = {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-env',
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        isDev && require.resolve('react-refresh/babel'),
                        [
                            'i18next-extract',
                            {
                                locales: ['ru', 'en'],
                                keyAsDefaultValue: true,
                            },
                        ],
                    ].filter(Boolean),
                },
            },
        ],
    };

    return [
        babelLoader,
        typescriptLoader,
        stylesLoader,
        svgLoader,
        fileLoader,
    ];
}
