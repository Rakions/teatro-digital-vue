import './assets/styles/main.css'
import './assets/styles/index.css'
import './assets/styles/aboutUs.css'
import './assets/styles/notFound.css'
import './assets/styles/purchaseCompleted.css'
import './assets/styles/purchasePage.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

// const messages = {
//   en: {
//     message: {
//       hello: 'hello world',
//       funciones: 'functions',
//       ofertas: 'sales'
//     }
//   },
//   ja: {
//     message: {
//       hello: 'hola',
//       funciones: 'funciones',
//       ofertas: 'ofertas'
//     }
//   }
// }

// const i18n = createI18n({
//   locale: 'es',
//   fallbackLocale: 'en',
//   messages
// })

const app = createApp(App)

app.use(router)

app.use(vuetify).mount('#app')
