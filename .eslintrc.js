module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
  },
  rules: {
    'prettier/prettier': 'off',
    'linebreak-style': 'off',
    'no-undef': 'error',
  },
}
