import { RouterView } from 'vue-router'
import { RouterTransition } from '@/components/transition'

export const constantRouterComponents = {
  '/system': RouterTransition, // 系统管理
  '/system/access': () => import('@/views/auth/system/access/index.vue'), // 资源管理
  '/system/account': () => import('@/views/auth/system/account/index.vue'), // 账号管理
  '/system/dict': () => import('@/views/auth/system/dict/index.vue'), // 字典管理
  '/system/role': () => import('@/views/auth/system/role/index.vue'), // 角色管理
  '/system/menu': () => import('@/views/auth/system/menu/index.vue') // 菜单管理
}
