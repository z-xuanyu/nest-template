import { RouteRecordRaw } from 'vue-router'

export type IAsyncRouteState = {
  menus: RouteRecordRaw[]
  keepAliveComponents: string[]
}

export const state: IAsyncRouteState = {
  menus: [],
  keepAliveComponents: []
}
