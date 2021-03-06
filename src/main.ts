import 'core-js/stable' // to polyfill ECMAScript features
import 'regenerator-runtime/runtime' // to use transpiled generator functions
import '@mdi/font/css/materialdesignicons.min.css' // ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import Affix from 'vue-affix'
import Vue2Filters from 'vue2-filters' // needed by SbcFeeSummary
import { fetchConfig, initLDClient } from '@/utils'
import { getVueRouter } from '@/router'
import { getVuexStore } from '@/store'
import '@/registerServiceWorker'
import '@/assets/styles/base.scss'
import '@/assets/styles/layout.scss'
import '@/assets/styles/overrides.scss'
import KeycloakService from 'sbc-common-components/src/services/keycloak.services'
import App from '@/App.vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

// get rid of "You are running Vue in development mode" console message
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(Affix)
Vue.use(Vue2Filters)

// main code
async function start () {
  // fetch config from environment and API
  // must come first as inits below depend on config
  await fetchConfig()

  // initialize Sentry
  console.info('Initializing Sentry...') // eslint-disable-line no-console
  Sentry.init({
    dsn: window['sentryDsn'],
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })

  // initialize Launch Darkly
  if (window['ldClientId']) {
    await initLDClient()
  }

  // configure Keycloak Service
  console.info('Starting Keycloak service...') // eslint-disable-line no-console
  await KeycloakService.setKeycloakConfigUrl(sessionStorage.getItem('KEYCLOAK_CONFIG_PATH'))

  // get Vue objects only after we have config
  const router = getVueRouter()
  const store = getVuexStore()

  // start Vue application
  console.info('Starting app...') // eslint-disable-line no-console
  new Vue({
    vuetify: new Vuetify({ iconfont: 'mdi' }),
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

// execution and error handling
start().catch(error => {
  // log any error after configuring sentry.
  // it helps to identify configuration issues specific to the environment.
  // note that it won't log anything related to `fetchConfig()` since sentry is depending on a config value.
  Sentry.captureException(error)
  console.log(error) // eslint-disable-line no-console
  // bypass alert if this specific error
  if (!error?.message?.startsWith('Missing or invalid')) {
    alert('There was an error starting this page. (See console for details.)\n' +
      'Please try again later.')
  }
  // try to redirect to Business Registry home page
  const businessesUrl = sessionStorage.getItem('BUSINESSES_URL')
  if (businessesUrl) {
    // assume Businesses URL is always reachable
    window.location.assign(businessesUrl)
  }
})
