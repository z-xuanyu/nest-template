/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-23 15:26:15
 * @LastEditTime: 2021-07-23 15:30:20
 * @Description: Modify here please
 */
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
