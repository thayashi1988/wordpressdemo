module.exports = {
  // ==================
  // 定義済ルールセット
  // ==================
  extends: [
    // SCSS標準ルール
    'stylelint-config-recommended-scss',
    // CSS標準ルール
    'stylelint-config-standard',
    // プロパティ記述順序ルール
    // 'stylelint-config-recess-order'
  ],

  // ==========
  // プラグイン
  // ==========
  plugins: [
    // display値によって無効化されてしまうプロパティの検出
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-scss',
  ],

  // ======================
  // プロジェクトルール定義
  // ======================
  rules: {
    // @から始まる記述への警告
    'at-rule-no-unknown': null,
    // 末尾には必ずセミコロン
    'declaration-block-trailing-semicolon': 'always',
    // 疑似要素のコロンを２つ
    'selector-pseudo-element-colon-notation': 'double',
    // calc()の表記が間違っていないかをチェック
    'function-calc-no-invalid': true,
    // calc()の演算子の左右にスペースが入っているかチェック
    'function-calc-no-unspaced-operator': true,
    // 同一セレクタ内で同じプロパティが使われていないかをチェック
    'declaration-block-no-duplicate-properties': true,
    // linear-gradientの表記が間違っていないかチェック
    'function-linear-gradient-no-nonstandard-direction': true,
    // 存在しないプロパティが使われていないかをチェック
    'property-no-unknown': true,
    // 擬似クラスの名前があっているかをチェック
    'selector-pseudo-class-no-unknown': true,
    // 擬似要素の名前があっているかをチェック
    'selector-pseudo-element-no-unknown': true,
    // @から始まる記述への警告（SCSS）
    'scss/at-rule-no-unknown': [
      true,
      {
        // @use, @forward構文の使用を許可
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    // 重複したセレクタの検出
    'no-duplicate-selectors': null,

    // display値によって無効化されてしまうプロパティの検出
    'plugin/declaration-block-no-ignored-properties': true,
  },

  // ======================
  // 除外ファイル
  // ======================
  ignoreFiles: ['**/node_modules/**', '**/dist/**/*.css'],
};
