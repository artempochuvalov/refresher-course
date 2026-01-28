import babelRemovePropsPlugin from '../../babel/pligins/babelRemovePropsPlugin';

interface BabelLoaderProps {
    isDev: boolean;
    isTsx: boolean;
}

export const buildBabelLoader = (({ isDev, isTsx }: BabelLoaderProps) => ({
    test: isTsx ? /\.[jt]sx$/ : /\.[jt]s$/,
    exclude: /node_modules/,
    use: [
        {
            loader: require.resolve('babel-loader'),
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    isDev && require.resolve('react-refresh/babel'),
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: [
                                'data-testid',
                            ],
                        },
                    ],
                ].filter(Boolean),
            },
        },
    ],
}));
