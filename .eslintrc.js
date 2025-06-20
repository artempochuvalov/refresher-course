module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'simple-import-sort',
        'i18next',
        'react-hooks',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4, { SwitchCase: 1 }],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'form',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 100 }],
        'comma-dangle': ['error', {
            functions: 'never',
            objects: 'always-multiline',
            arrays: 'always-multiline',
            imports: 'never',
            exports: 'never',
        }],
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        radix: 'off',
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
        {
            files: ['**/src/shared/ui/**/*.tsx'],
            rules: {
                'react/jsx-props-no-spreading': 'off',
            },
        },
        {
            files: ['**/src/**/*.stories.{ts,tsx}'],
            rules: {
                'max-len': 'off',
                'i18next/no-literal-string': 'off',
            },
        },
    ],
};
