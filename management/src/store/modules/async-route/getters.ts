import { IAsyncRouteState } from './state'
import { RouteRecordRaw } from 'vue-router'

export const getters = {
  menus(state: IAsyncRouteState): RouteRecordRaw[] {
    return state.menus
  }
}
