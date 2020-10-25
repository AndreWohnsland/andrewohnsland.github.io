module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  env: { browser: true, jest: true },
  rules: {
    'max-len': ['error', { code: 120 }],
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/prop-types': ['off'],
    'no-return-assign': ['off'],
    'no-underscore-dangle': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
  },
};
