export const buildBabelLoader = ((isDev: boolean) => ({
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
}));
