import { RouteRecordRaw } from 'vue-router'

/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/shared/login/index.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/shared/icons/index.vue')
  }
]

export default routes
