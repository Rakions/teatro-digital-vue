import './assets/styles/main.css'
import './assets/styles/index.css'
import './assets/styles/aboutUs.css'
import './assets/styles/notFound.css'
import './assets/styles/purchaseCompleted.css'
import './assets/styles/purchasePage.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
