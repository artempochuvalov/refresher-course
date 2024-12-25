import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { DefinePlugin } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';
import { BuildPaths } from '../build/types/config';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-webpack5-compiler-babel',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal: async (config) => {
        const paths: BuildPaths = {
            entry: '',
            build: '',
            HTML: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
        };

        config.resolve!.modules!.push(paths.src);
        config.resolve!.extensions!.push('.ts', '.tsx');

        // eslint-disable-next-line no-param-reassign
        config.module!.rules = config.module?.rules?.map((rule) => {
            if (rule && typeof rule === 'object') {
                const isSvgRule = /svg/.test(String(rule.test));
                if (isSvgRule) {
                    return {
                        ...rule,
                        exclude: /\.svg$/i,
                    };
                }
            }

            return rule;
        });
        const rules = [
            buildCssLoader(true),
            buildSvgLoader(),
        ];
        config.module!.rules!.push(...rules);

        const plugins = [
            new DefinePlugin({
                __IS_DEV__: true,
            }),
        ];
        config.plugins?.push(...plugins);

        return config;
    },
    staticDirs: [
        '../../public',
    ],
};

export default config;
