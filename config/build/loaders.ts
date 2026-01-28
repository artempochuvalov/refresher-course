import type { ModuleOptions } from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import type { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { isDev } = options;

    const codeBabelLoader = buildBabelLoader({ isDev, isTsx: false });
    const tsxBabelLoader = buildBabelLoader({ isDev, isTsx: true });

    const stylesLoader = buildCssLoader(isDev);

    const svgLoader = buildSvgLoader();

    const fileLoader = {
        test: /\.(png|jpg|jpeg)$/i,
        loader: 'url-loader',
        type: 'javascript/auto',
    };
    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxBabelLoader,
        stylesLoader,
    ];
}
