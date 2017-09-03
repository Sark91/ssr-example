module.exports = {
  parser: 'babel-eslint',
  'extends': 'airbnb',
  rules: {
    'react/jsx-filename-extension': 0,
    'eol-last': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
  },
  globals: {
    window: true,
    document: true,
    fetch: true,
  },
};