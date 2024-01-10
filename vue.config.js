const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // TODO:
  // LOCALE
  // publicPath: process.env.NODE_ENV === 'production' ? '/admin/c-panel/myCloud/' : '/',
  // ONLINE
  publicPath: process.env.NODE_ENV === 'production' ? '/my_site/admin/c-panel/myCloud/' : '/',
})
