module.exports = {
  extends: 'expo',

  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error', // 检测并删除未使用的 import
    'unused-imports/no-unused-vars': 'off'
  },

  plugins: ['unused-imports'], // 添加插件

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.config.js',
    '*.d.ts',
    'package.json',
    'yarn.lock',
    'tsconfig.json',
    'app.json',
    'eas.json',
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