import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';

import projectSetting from '/@/settings/projectSetting';

import { PermissionModeEnum } from '/@/enums/appEnum';

import { asyncRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

import { getMenuList } from '/@/api/sys/menu';
// import { getPermCode } from '/@/api/sys/user';

import { useMessage } from '/@/hooks/web/useMessage';

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    // 获取权限码
    // async changePermissionCode() {
    //   const codeList = await getPermCode();
    //   this.setPermCodeList(codeList);
    // },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRmoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          const menuList = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRmoveIgnoreFilter);
          routes = routes.filter(routeRmoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage();

          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [
            // {
            //   path: '/dashboard',
            //   name: 'Dashboard',
            //   component: 'LAYOUT',
            //   redirect: 'dashboard/analysis',
            //   meta: {
            //     orderNo: 10,
            //     title: 'routes.dashboard.dashboard',
            //     icon: 'ion:grid-outline',
            //   },
            //   children: [
            //     {
            //       path: 'analysis',
            //       name: 'Analysis',
            //       component: '/dashboard/analysis/index',
            //       meta: {
            //         affix: false,
            //         title: 'routes.dashboard.analysis',
            //       },
            //     },
            //     {
            //       path: 'workbench',
            //       name: 'Workbench',
            //       component: '/dashboard/workbench/index',
            //       meta: {
            //         title: 'routes.dashboard.workbench',
            //       },
            //     },
            //   ],
            // },
            {
              path: '/dashboard',
              name: 'Welcome',
              component: '/dashboard/analysis/index',
              meta: {
                title: 'routes.dashboard.analysis',
                affix: true,
                icon: 'bx:bx-home',
              },
            },
          ];

          // 转化树结构
          const listTree = (items, parentId = null) => {
            return items
              .filter((item: any) => item.parentId == parentId)
              .map((item: any) => {
                if (listTree(items, item._id).length) {
                  return {
                    path: `/${item.url}`,
                    name: item.componentName,
                    meta: {
                      orderNo: item.sort,
                      title: item.name,
                      icon: item.icon,
                      ignoreKeepAlive: Boolean(item.keepAlive),
                    },
                    component: 'LAYOUT',
                    redirect: `/${listTree(items, item._id)[0].path}`,
                    children: listTree(items, item._id),
                  };
                } else {
                  return {
                    path: item.url.split('/')[item.url.split('/').length - 1],
                    name: item.componentName,
                    meta: {
                      title: item.name,
                      icon: item.icon,
                      orderNo: item.sort,
                      ignoreKeepAlive: Boolean(item.keepAlive),
                    },
                    component: `/${item.url}/index`,
                  };
                }
              });
          };
          // 后端接口请求返回结构
          try {
            // 改变权限码
            // this.changePermissionCode();
            const menuRes = (await getMenuList()) as AppRouteRecordRaw[];
            const menuList = listTree(menuRes);
            routeList = routeList.concat(menuList);
          } catch (error) {
            console.error(error);
          }

          // Dynamically introduce components
          routeList = transformObjToRoute(routeList);
          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRmoveIgnoreFilter);
          routeList = routeList.filter(routeRmoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
      }

      routes.push(ERROR_LOG_ROUTE);
      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
