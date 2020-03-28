require('dotenv').config();

const config = {
  build: {
    hardSource: process.env.HARD_SOURCE,
  },
  buildModules: [
    '@nuxt/typescript-build',
  ],
  mode: "spa",
  srcDir: 'client/',
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  modules: [
    // '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
  ],
  plugins: [
    '@/plugins/element-ui.js',
    '@/plugins/babel-polyfill.js',
    '@/plugins/i18n',
    '@/plugins/focus',
    '@/plugins/notify',
    // '@/plugins/api',
    // '@/plugins/axios-accessor',
    // '@/plugins/axios',
    // '@/plugins/auth',
    // '@/plugins/store_proxy',
  ],
  webfontloader: {
    custom: {
      families: [
        'Roboto',
        'Noto Sans JP'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
        'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese'
      ]
    }
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/sass/element-variables.scss',
    '@/assets/sass/main.scss',
  ],
  head: {
    titleTemplate: 'COVID-19 Simulate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' },
      { rel: 'manifest', href: '/img/manifest.json' },
    ]
  },
  styleResources: {
    scss: ['@/assets/sass/_variables.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-source-map';
      }
    }
  }
};

export default config;
