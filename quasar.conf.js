const path = require('path')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['i18n', 'axios', 'utils', 'errorHandler', 'resultHandler', 'configManager'],

    css: ['app.styl'],

    extras: [
      'ionicons-v4',
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
      iconSet: 'fontawesome-v5',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QCheckbox',
        'QOptionGroup',
        'QDialog',
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
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QInput',
        'QBadge',
        'QScrollArea',
        'QImg',
        'QBanner',
        'QSpace',
        'QTooltip',
        'QChatMessage',
        'QForm',
        'QLinearProgress',
        'QSeparator',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QVirtualScroll'
      ],

      directives: ['Ripple', 'ClosePopup'],

      // Quasar plugins
      plugins: ['Notify', 'Dialog']
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, './src')
        }
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules|assets/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
        cfg.module.rules.push({
          test: /\.sh$/i,
          use: 'raw-loader',
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

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
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
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
        productName: 'Volentix Node',
        appId: 'io.volentix.volentixnode',
        /* eslint-disable */
        artifactName: '${name}-${os}-${version}.${ext}',
        /* eslint-enable */
        // "directories": {
        //   "output": "build"
        // },
        // "files": [
        //   "dist/electron/**/*"
        // ],
        extraResources: ['resources/**'],
        dmg: {
          background: 'src-electron/icons/background.tiff',
          /* eslint-disable */
          title: '${productName}-${version}',
          /* eslint-enable */
          contents: [
            {
              x: 520,
              y: 225,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 280,
              y: 230,
              type: 'file'
            }
          ]
        },
        mac: {
          // 'icon': 'src/statics/icons/icon.icns',
          target: ['zip', 'dmg'],
          extendInfo: {
            NSAppTransportSecurity: {
              NSAllowsArbitraryLoads: false
            },
            NSExceptionDomains: {
              localhost: {
                NSTemporaryExceptionAllowsInsecureHTTPSLoads: false,
                NSIncludesSubdomains: false,
                NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
                NSTemporaryExceptionMinimumTLSVersion: '1.0',
                NSTemporaryExceptionRequiresForwardSecrecy: false
              }
            }
          }
        },
        win: {
          // 'icon': 'src/statics/icons/icon.ico',
          target: 'nsis',
          publisherName: 'Volentix Labs, Inc.'
        },
        linux: {
          category: 'Network',
          description: 'Volentix Node',
          desktop: {
            Name: 'Volentix Node',
            GenericName: 'volentixnode',
            'X-GNOME-FullName': 'Volentix Node',
            Comment: 'vDexNode',
            Type: 'Application',
            Terminal: 'false',
            StartupNotify: 'false',
            Categories: 'Network;'
          },
          // 'icon': 'src/statics/icons/...',
          target: ['deb', 'AppImage']
        },
        publish: [
          {
            owner: 'Volentix',
            provider: 'github',
            releaseType: 'draft',
            url: 'https://github.com/Volentix/vdexnode-gui.git'
          }
        ]
      }
    }
  }
}
