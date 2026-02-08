import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
    },
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    modulePaths: [
        '<rootDir>src',
    ],
    rootDir: '../../',
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.s?css$': 'identity-obj-proxy',
        '\\.svg$': path.resolve(__dirname, 'fileTransformer.tsx'),
    },
    reporters: [
        'default',
        ['jest-html-reporters', {
            publicPath: '<rootDir>/reports/unit',
            filename: 'report.html',
            // openReport: true,
            inlineSource: true,
        }],
    ],
};

export default config;
