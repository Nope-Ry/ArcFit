// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',

  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.config.js',
  ],

  settings: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 60,
        tabWidth: 2,
        semi: true,
      },
    ],
  },

};
