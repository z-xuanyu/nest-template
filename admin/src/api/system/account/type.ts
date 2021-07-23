/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:19:36
 * @LastEditTime: 2021-07-23 17:15:41
 * @Description: Modify here please
 */
export interface AddAccountForm {
  name: string;
  email: string;
  password?: string;
  roleIds: Array<string>;
}

export interface ChangeAdminStatusQuery {
  adminId: string;
  status: boolean;
}
