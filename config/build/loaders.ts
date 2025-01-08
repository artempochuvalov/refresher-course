import type { ModuleOptions } from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
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

    const babelLoader = buildBabelLoader(isDev);

    return [
        babelLoader,
        typescriptLoader,
        stylesLoader,
        svgLoader,
        fileLoader,
    ];
}
