module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'airbnb-base', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'no-underscore-dangle': ['off'],
    'linebreak-style': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 0,
  },
}
