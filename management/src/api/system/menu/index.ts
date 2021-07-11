import { RequestEnum } from '@/enums/httpEnum'
import http from '@/utils/http/axios'

enum Api {
  adminMenu = '/menu/list',
  Menu = '/menu'
}

/**
 * 获取菜单列表
 */
export function getMenuList() {
  return http.request({
    url: Api.adminMenu,
    method: RequestEnum.GET
  })
}

/**
 * 添加菜单导航栏
 */
export function addMenu(params) {
  return http.request(
    {
      url: Api.Menu,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '添加成功'
    }
  )
}



/**
 * 修改账号
 * @param params
 */
export function updateMenu(id, params) {
  return http.request(
    {
      url: `${Api.Menu}/${id}`,
      method: RequestEnum.PATCH,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '修改成功'
    }
  )
}


/**
 * 删除菜单
 */
export function delMenu(id: string) {
  return http.request({
    url: `${Api.Menu}/${id}`,
    method: RequestEnum.DELETE
  })
}

