// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const envparser = require('./config/envparser')
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QRadio',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QInfiniteScroll',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QSeparator',
        'QSpinnerDots',
        'QMenu',
        'QAvatar',
        'QImg',
        'QTooltip',
        'QBadge',
        'QBtnGroup',
        'QFab',
        'QFabAction',
        'QPageSticky',
        'QDrawer',
        'QScrollArea',
        'QOptionGroup',
        'QDialog',
        'QSpace',
        'QChatMessage',
        'QBar',
        'QInput',
        'QEditor',
        'QTree',
        'QChip',
        'QInnerLoading',
        'QSpinnerGears',
        'QSpinnerFacebook',
        'QCarousel',
        'QCarouselSlide',
        'QParallax',
        'QToggle',
        'QForm',
        'QLinearProgress',
        'QFooter',
        'QImg',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QTabPanel',
        'QTabPanels',
        'QPullToRefresh',
        'QSpinnerIos',
        'QSelect',
        'QDate',
        'QBanner',
        'QPopupProxy',
        'QUploader',
        'QCheckbox'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'SessionStorage',
        'Notify',
        'Loading',
        'Dialog'
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: ctx.dev ? { ...envparser() } : { BASEURL: JSON.stringify(process.env.BASEURL) },
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // extendWebpack (cfg) {
      //   cfg.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /node_modules/,
      //     options: {
      //       formatter: require('eslint').CLIEngine.getFormatter('stylish')
      //     }
      //   })
      // }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    animations: 'all', // --- includes all animations
    // animations: [
    //   'fadeIn',
    //   'fadeOut'
    // ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar App',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar_example'
      }
    }
  }
}
