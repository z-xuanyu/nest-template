/**
 * 向后端请求用户的菜单，动态生成路由
 */

import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

export type { IAsyncRouteState } from './state'

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
