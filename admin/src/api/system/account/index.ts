/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:17:38
 * @LastEditTime: 2021-07-23 10:40:46
 * @Description: Modify here please
 */

import { AddAccountForm, ChangeAdminStatusQuery } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Admin = '/Admin',
  Change = '/Admin/changeStatus',
}

//  获取管理員列表
export function getAdminList() {
  return defHttp.get({ url: Api.Admin });
}

//  添加管理员
export function addAdmin(params: AddAccountForm) {
  return defHttp.post({ url: Api.Admin, params });
}

//  更新管理员
export function updateAdmin(id: string, params: AddAccountForm) {
  return defHttp.patch({ url: `/${Api.Admin}/${id}`, params });
}

//  删除管理员
export function delAdmin(id: string) {
  return defHttp.delete({ url: `/${Api.Admin}/${id}` });
}

// 改变管理员状态
export function changeAdminStatus(params: ChangeAdminStatusQuery) {
  return defHttp.put({
    url: Api.Change,
    params,
  });
}
