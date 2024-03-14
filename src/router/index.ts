import { createRouter, createWebHistory } from 'vue-router'
import Asientos from '../views/AsientosView.vue'

import IndexView from '../views/IndexView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PurchaseCompletedView from '../views/PurchaseCompletedView.vue'
import PurchasePageView from '../views/PurchasePageView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/asientos',
      name: 'asientos',
      component: Asientos
    },
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/aboutUs',
      name: 'aboutus',
      component: AboutUsView
    },
    {
      path: '/purchaseCompleted',
      name: 'purchasecompleted',
      component: PurchaseCompletedView
    },
    {
      path: '/purchasePage',
      name: 'purchasepage',
      component: PurchasePageView
    },
    {
      path: '/register',
      name: 'registerpage',
      component: RegisterView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    }
  ]
})

export default router
