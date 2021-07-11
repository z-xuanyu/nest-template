import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'
import { AccessItem, AccessResultModel, ModuleItem } from './AccessModel'

enum Api {
  adminAccess = '/menu',
  adminAccessModule = '/menu/module'
}

/**
 * 获取模块列表
 * @param params
 */
export function getAdminAccessModule() {
  return http.request<ModuleItem[]>({
    url: Api.adminAccessModule,
    method: RequestEnum.GET,
  })
}

/**
 * 获取资源管理列表
 * @param params
 */
export function getAdminAccess(params) {
  return http.request<AccessResultModel>({
    url: Api.adminAccess,
    method: RequestEnum.GET,
    params
  })
}

/**
 * 删除资源
 * @param params
 */
export function delAdminAccess(id: string) {
  return http.request(
    {
      url: [Api.adminAccess, id].join('/'),
      method: RequestEnum.DELETE
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '删除成功'
    }
  )
}

/**
 * 修改资源
 * @param params
 */
export function patchAdminAccess(id, params) {
  return http.request(
    {
      url: [Api.adminAccess, id].join('/'),
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
 * 新建资源
 * @param params
 */
export function postAdminAccess(params) {
  return http.request<AccessItem>(
    {
      url: Api.adminAccess,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '创建成功'
    }
  )
}
