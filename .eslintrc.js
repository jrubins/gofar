/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier',
  ],
  rules: {
    'react/jsx-sort-props': [
      'error',
      {
        reservedFirst: true,
      },
    ],
  },
}
