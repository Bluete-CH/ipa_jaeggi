module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    // sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': [2, { props: false }],
  },
};
