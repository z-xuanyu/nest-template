import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'

const routes: Array<RouteRecordRaw> = [
  {
    path: 'http://www.zhouxuanyu.com/',
    name: 'http://www.zhouxuanyu.com/',
    component: RouterTransition,
    meta: {
      title: '轩钰博客',
      icon: 'icon-externa-link'
    }
  }
]

export default routes
