module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  globals: {},
  rules: {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-var': 1, //varでの宣言をNG
    eqeqeq: 2, //等価演算子を厳密等価演算子のみを許可
    'no-console': [
      //console.logのみ許可
      'warn',
      {
        allow: ['log'],
      },
    ],
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true, //シングルクォーテーション内のエスケープを許可
        allowTemplateLiterals: true, //テンプレートリテラル内のエスケープを許可
      },
    ],
  },
};
