import path from 'path';

import type { BuildEnv, BuildPaths } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/webpackConfig';

export default (env: BuildEnv) => {
    const {
        port: PORT = 3000,
        mode = 'development',
        apiUrl = JSON.stringify('http://localhost:8000'),
    } = env;
    const isDev = mode === 'development';

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        HTML: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const config = buildWebpackConfig({
        mode,
        isDev,
        paths,
        port: PORT,
        apiUrl: apiUrl ?? 'http://localhost:8000',
        project: JSON.stringify('frontend') as 'frontend',
    });

    return config;
};
