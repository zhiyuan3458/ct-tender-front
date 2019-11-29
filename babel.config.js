module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: false,
        targets: {
          // 浏览器
          browsers: [
            'ie >= 11'
          ]
        }
      }
    ]
  ]
};
