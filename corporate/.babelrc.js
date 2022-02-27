module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: {
          ie: 11,
          android: 6,
          ios: 10,
        },
        corejs: 3,
        modules: false,
      },
      '@babel/preset-typescript',
    ],
  ],
  plugins: [
    // TypeScriptの文法には既に含まれているけど、
    // 今はまだpreset-envには含まれていない文法も使えるようにしておく。
    // preset-envに含まれる日が来たら、これらのプラグインは不要になるはず。
    // "@babel/proposal-class-properties",
    // "@babel/proposal-object-rest-spread"
  ],
};
