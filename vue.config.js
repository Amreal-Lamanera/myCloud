const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // TODO:
  // LOCALE
  // publicPath: process.env.NODE_ENV === 'production' ? '/admin/c-panel/myCloud/' : '/',
  // ONLINE
  publicPath: process.env.NODE_ENV === 'production' ? 'https://www.francescopieraccini.it/my_site/myCloud/' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    },
    name: 'myCloud',
    themeColor: '#0f172a',
    msTileColor: '#0f172a',
    msTileImage: '/my_site/src/img/loghi/favicon/apple-touch-icon.png',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    display_override: [
      "fullscreen",
      "minimal-ui",
      "window-controls-overlay"
    ],
    display: "standalone",
    iconPaths:
    {
      faviconSVG: '../src/img/loghi/favicon/favicon.svg',
      favicon32: '../src/img/loghi/favicon/favicon-32x32.png',
      favicon16: '../src/img/loghi/favicon/favicon-16x16.png',
      appleTouchIcon: '../src/img/loghi/favicon/apple-touch-icon.png',
      maskIcon: '../src/img/loghi/favicon/favicon.svg',
      msTileImage: '../src/img/loghi/favicon/apple-touch-icon.png'
    },
    manifestOptions: {
      icons: [
        {
          src: '/my_site/src/img/loghi/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: '/my_site/src/img/loghi/favicon/favicon.svg',
          sizes: '1000x1000',
          type: 'image/svg+xml',
        },
        {
          src: '/my_site/src/img/loghi/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/my_site/src/img/loghi/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/my_site/src/img/loghi/favicon/favicon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
      ],
    },
  },
})
