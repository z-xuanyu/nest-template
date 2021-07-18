import { adminMenus } from '@/api/system/menu'
import { constantRouterComponents } from './constantRouterComponents'
import router from '@/router/index'
import { routes } from '@/router/index'
import { notFound } from '@/router/modules/error'
import { Empty } from 'ant-design-vue'
import common from '@/router/common'
import { RouteRecordRaw } from 'vue-router'

/**
 * 异步生成菜单树， 方案二
 * @param dataList
 */
const list2tree = (items, parentId = null, arr = [], pathPrefix = '') => {
  return items
    .filter((item) => item.parentId == parentId)
    .map((item: any) => {
      const { icon, _id, name, parentId, sort, keepAlive, meta, url } = item
      let path = ''
      if (/http(s)?:/.test(url)) {
        path = url
      } else {
        path = url.startsWith('/') ? url : '/' + url
        path = url.startsWith(1 ) ? path : pathPrefix + path
        path = [...new Set(path.split('/'))].join('/')
      }
      // 路由对应的组件
      const component =
        constantRouterComponents[path] || Empty || (() => import('@/views/shared/error/404.vue'))
      return {
        path: path,
        // 路由名称，建议唯一
        name: path || '',
        children: list2tree(items, item._id, [], path),
        // 该路由对应页面的 组件 (动态加载)
        component: component,
        props: true,
        // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
        meta: {
          title: meta?.title || name,
          icon: icon || 'icon-zhuomian',
          // hiddenHeaderContent: hiddenHeaderContent,
          // permission: item.actions || []
          keepAlive: keepAlive == 1,
          reload: false,
          componentName: component.name,
          // TODO 简单模拟CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作，可以自行修改查看页面效果
          permission:
            parentId == null
              ? []
              : ['create', 'update', 'retrieve', 'delete'].map(
                  (n) =>
                    `${path
                      .split('/')
                      .filter((m) => m.trim() != '')
                      .join('.')}.${n}`
                )
        }
      }
    })
    .sort((a, b) => a.sort - b.sort)
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    adminMenus()
      .then((result) => {
        const menuNav: any = []
        const childrenNav = []
        //      后端数据, 根级树数组,  根级 PID
        // listToTree(data, childrenNav, 0)
        // rootRouter.children = childrenNav
        menuNav.push(childrenNav)
        const routeList = list2tree(result)
        console.log(routeList, '根据后端返回的权限路由生成')
        routeList.forEach((item) => {
          // 设置模块重定向到菜单
          if (item.children?.length > 0 && !item.redirect) {
            item.redirect = { name: item.children[0].name }
          }
        })
        const layout = routes.find((item) => item.name == 'Layout')!
        layout.children = [...common, ...routeList]
        // const routes = [...common,...routeList]
        // routes.forEach(item => router.addRoute('Layout', item))
        router.addRoute(layout)
        router.addRoute(notFound)
        resolve(layout.children)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
