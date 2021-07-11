/**
 * 锁屏
 */

import { state } from './state'
import { mutations } from './mutations'

export type { ILockscreenState } from './state'

export default {
  namespaced: true,
  state,
  mutations
}
