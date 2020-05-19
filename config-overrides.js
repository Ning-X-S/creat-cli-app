const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd-mobile', {
    style: 'css',
  }),
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
      // localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    },
  })
);
