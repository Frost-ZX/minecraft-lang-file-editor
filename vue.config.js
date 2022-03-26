const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({

  assetsDir: 'static',
  outputDir: 'dist',
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: false,

  devServer: {
    host: '0.0.0.0',
    port: 9200,
  },

});
