module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unused-imports/recommended', // unused-imports/no-unused-imports
    'plugin:prettier/recommended', // prettier errors as ESLint errors
  ],
  rules: {
    // 未使用 import を自動削除
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // import のソート
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Prettier を ESLint のルールに
    'prettier/prettier': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
