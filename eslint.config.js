module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    overrides: [
      {
        files: ['*.ts'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
          ],
        parserOptions: {
          project: ['./tsconfig.json'],
        },
      },
    ],
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
        "@typescript-eslint/strict-boolean-expressions": [
            2,
            {
                allowSrings: false,
                allowNumber: false,
            },
        ]
    },
    ignorePatterns: ['*!.*', 'node_modules', 'dist', 'build'],
  };