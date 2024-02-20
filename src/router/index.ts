import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PurchaseCompletedView from '../views/PurchaseCompletedView.vue'
import PurchasePageView from '../views/PurchasePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    }
  ]
})

export default router
