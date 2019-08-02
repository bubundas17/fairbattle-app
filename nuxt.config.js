import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  server: {
    port: 3000,
    host: "192.168.31.18",
  },
  mode: 'spa',
  router: {
    // mode: 'hash',
    // base: './'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#fff' },
  loading:false,

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/onerror',
    '@/plugins/vuetify',
    '@/plugins/filters',
    '@/plugins/alerts',
    '@/plugins/vee-validate',
    '@/plugins/mixins',
    '@/plugins/mdi',
    '@/plugins/localStorage',
    '@/plugins/client-init'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // baseURL: "http://192.168.31.18:3001/api/",
    baseURL: "https://fairbattle.net/api/",
    withCredentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false
    },

    publicPath: '/assets/',
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        // relative links, please.
        config.output.publicPath = './assets/'
        // config.output.maxChunks = 1
      }
      return config
    },
    // extend(config, ctx) {
    // }
    hooks: {
      'generate:page': (page) => {
        page.html = modifyHtml(page.html)
      },
      'render:route': (url, page, { req, res }) => {
        page.html = modifyHtml(page.html)
      }
    },
  },

}


const modifyHtml = (html) => {
  return html.replace(/ data-n-head="true"/g, '')
};
