export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Brikc',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/62af4b3e11.js' },
      { src: 'codemirror/lib/codemirror.js' },
      { src: 'codemirror/mode/javascript/javascript.js' },
      { src: 'codemirror/addon/edit/closebrackets.js' },
      { src: 'codemirror/addon/edit/matchbrackets.js' },
      { src: 'https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/8.2.7/firebase-auth.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)

  css: [
    // lib css
    '~/static/codemirror/lib/codemirror.css',
    // theme css
    '~/static/codemirror/theme/dracula.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/persist.client.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  env: {
    firebaseConfig: '{"apiKey": "AIzaSyDJjd35Imt-aULOyhzC3juMFzzYHtV6ibg","authDomain": "brikcs-32e4f.firebaseapp.com", "projectId": "brikcs-32e4f", "storageBucket": "brikcs-32e4f.appspot.com", "messagingSenderId": "1081404799649", "appId": "1:1081404799649:web:c5da801a4e2862cbf70ee0", "measurementId": "G-WTLD8RZWQ7"}',
    BASE_URL: 'https://brikcs.herokuapp.com/api',
    BASE_URL_LOC: 'http://localhost:3280/api'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://brikcs.herokuapp.com/api'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: { disabled: true }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
}
