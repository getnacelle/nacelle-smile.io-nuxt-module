import path from 'path'
import fs from 'fs-extra'

require('dotenv').config()

export default {
  mode: process.env.BUILD_MODE,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: `//dmf8x4ovgacxs.cloudfront.net/${process.env.NACELLE_SPACE_ID}/styles.css`
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/global.css',
    'vue-glide-js/dist/vue-glide.css'
  ],

  env: {
    nacelleSpaceID: process.env.NACELLE_SPACE_ID,
    nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
    buildMode: process.env.BUILD_MODE
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nacelle/nacelle-nuxt-module',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    'nuxt-polyfill',
    'vue-currency-filter/nuxt',
    '~/../lib/module.js'
  ],

  router: {
    middleware: 'cart'
  },

  polyfill: {
    features: [
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window
      }
    ]
  },

  sitemap: {
    gzip: true,
    hostname: 'http://localhost:3000', // When deploying, change this to your production URL
    routes: () => {
      const staticDir = path.resolve(__dirname, './static/data')
      const routes = fs.readJsonSync(`${staticDir}/routes.json`)
      const routesOnly = routes.map(route => route.route)

      return routesOnly
    }
  },

  /*
   ** Nacelle Configuration
   * https://docs.getnacelle.com/nuxt/nuxt-config.html
   */
  nacelle: {
    /* Required Parameters */
    spaceID: process.env.NACELLE_SPACE_ID,
    token: process.env.NACELLE_GRAPHQL_TOKEN,

    /* Optional */

    // Google Analytics ID
    // gaID: process.env.NACELLE_GA_ID,

    // Facebook Pixel Tracking ID
    // fbID: process.env.NACELLE_FB_ID,

    // Set the default internationalization locale string for Nacelle to use
    // locale: 'en-us',

    // Customize the route base paths used by Nacelle and Nuxt during generate
    // Learn more in our docs: https://docs.getnacelle.com/nuxt/nuxt-config.html#routeconfig
    // routeConfig: null,

    // Function that can be used for modifying the route array for adding or customizing
    // routes during generate.
    // Learn more in our docs: https://docs.getnacelle.com/nuxt/nuxt-config.html#extendroutes
    // extendRoutes: null,

    // Optional array of data type strings to direct Nacelle to include other data types
    // besides products in search data.
    // searchDataTypes: ['article', 'page', 'blog'],

    // Set to true to bypass fetching data from your space and generating
    // static JSON files.
    // Only set to true if you have previously performed this step at least once.
    // skipPrefetch: process.env.SKIP_PREFETCH === 'true',

    // If you wish to set the Nacelle GraphQL endpoint to something other than the
    // default.
    // customEndpoint: process.env.NACELLE_CUSTOM_ENDPOINT,

    // Set the event tracking endpoint to a URL other than the default
    // tem: process.env.NACELLE_TEM,

    // Customize the build process by creating a new NacelleClient class
    // object.
    // buildClient: null,
  },

  generate: {
    concurrency: 5,
    done({ errors }, nuxt) {
      nuxt.callHook('generate:done', ({ nuxt, errors }))
    }
  },

  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    transpile: ['@nacelle/nacelle-nuxt-module', '@nacelle/nacelle-tools', 'fuse.js', 'uuidv4']
  }
}
