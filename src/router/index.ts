import { createRouter, createWebHistory } from 'vue-router'
import ObraView from '../views/ObraView.vue'
import IndexView from '../views/IndexView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PurchaseCompletedView from '../views/PurchaseCompletedView.vue'
import PurchasePageView from '../views/PurchasePageView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/obra/:obraId',
      name: 'obra',
      component: ObraView
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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    }
  ]
})

export default router
