import type { Configuration } from 'webpack';

import { buildDevServer } from './devServer';
import { buildLoaders } from './loaders';
import { buildPlugins } from './plugins';
import { buildResolvers } from './resolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    const config: Configuration = {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };

    return config;
}
