module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'comma-dangle': 0,
    'no-console': 0,
    'operator-linebreak': [2, 'before'],
    'linebreak-style': 0,
    'consistent-return': 'off',
    'max-len': 0,
    camelcase: 'off',
    'no-plusplus': 0,
    'import/prefer-default-export': 'off',
    quotes: ['error', 'single'],
    'no-param-reassign': 0,
    'import/extensions': ['error', 'always']
  },
};
