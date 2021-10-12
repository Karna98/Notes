/*-----     -----     -----     -----     -----     -----     -----     ----- 
.babelrc

Description: ESLint configuration file.

Version  : 0.0.1
Date     : 10-10-2021 
Author   : Vedant Wakalkar 
Email    : developer.karna98@gmail.com 
-----     -----     -----     -----     -----     -----     -----     -----*/

/* 
  1. Read More about ESLint at https://eslint.org/docs/user-guide/getting-started.
*/
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
