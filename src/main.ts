import './assets/styles/main.css'
import './assets/styles/index.css'
import './assets/styles/aboutUs.css'
import './assets/styles/notFound.css'
import './assets/styles/purchaseCompleted.css'
import './assets/styles/purchasePage.css'
import './assets/styles/dashboard.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-noir/theme.css'
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello world',
      funciones: 'functions',
      ofertas: 'sales'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
      funciones: '機能',
      ofertas: 'オファー'
    }
  }
}

const i18n = createI18n({
  locale: 'ja', // establece el idioma actual
  fallbackLocale: 'en', // establece el idioma de respaldo
  messages // establece los mensajes de idiomas
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  pt: {
  }
})
app.use(ToastService);

app.mount('#app')
