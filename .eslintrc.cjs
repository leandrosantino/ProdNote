module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
    ],
    settings: {
        react: {
          createClass: 'createReactClass',
          pragma: 'React',
          fragment: 'Fragment',
          version: 'detect',
          flowVersion: '0.53'
        }
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [
            './tsconfig.json',
            './tsconfig.node.json',
            './server.tsconfig.json'
        ]
    },
    plugins: [
        'react'
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-assertions':'off',
        '@typescript-eslint/strict-boolean-expressions': 'off'
    }
}
