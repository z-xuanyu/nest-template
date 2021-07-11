import { generatorDynamicRouter } from '@/router/generator-routers'

export const actions = {
  async generateRoutes({ commit }) {
    // 动态获取菜单
    const routers = await generatorDynamicRouter()
    commit('setRouters', routers)
    return routers
  }
}
