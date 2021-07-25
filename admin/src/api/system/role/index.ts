/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-23 15:26:15
 * @LastEditTime: 2021-07-23 15:30:20
 * @Description: Modify here please
 */
import { addRoleForm, updateRoleForm } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Role = '/role',
}

// 获取角色列表
export function getAdminRole() {
  return defHttp.get({
    url: Api.Role,
  });
}

// 添加角色
export function addRole(params: addRoleForm) {
  return defHttp.post({
    url: Api.Role,
    params,
  });
}

/**
 * 更新角色信息
 */
export function updateRole(id: string, params: updateRoleForm) {
  return defHttp.patch({
    url: `/${Api.Role}/${id}`,
    params,
  });
}

/** 
 * 删除角色 
 */
export function delRole(id: string) {
  return defHttp.delete({
    url: `/${Api.Role}/${id}`,
  });
}
