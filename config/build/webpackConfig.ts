import type { Configuration } from 'webpack';
import { BuildOptions } from './types/config';
import { buildLoaders } from './loaders';
import { buildExtensions } from './extensions';
import { buildPlugins } from './plugins';
import { buildDevServer } from './devServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    const config: Configuration = {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: {
            extensions: buildExtensions()
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }

    return config;
}