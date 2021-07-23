/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  code: number,
  message:string,
  token: string;
  userInfo: GetUserInfoModel;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户名
  name: string;
  // 邮箱
  email: string;
  // 头像
  avatar: string;
}
