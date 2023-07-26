import { createRouter, createWebHistory } from 'vue-router'
import BuildView from '@/views/BuildView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BuildView
    },
    {
      path: '/callback',
      name: 'gitlab',
      component: () => import('@/views/GitlabCallback.vue')
    }
  ]
})

export default router
