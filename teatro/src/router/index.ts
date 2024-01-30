import { createRouter, createWebHistory } from 'vue-router'
import Asientos from '../views/AsientosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/asientos',
      name: 'asientos',
      component: Asientos
    }
  ]
})

export default router
