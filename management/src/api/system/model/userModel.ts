/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-16 18:03:59
 * @Description: Modify here please
 */
import { RoleEnum } from '@/enums/roleEnum'

/**
 * @description: 登陆接口参数
 */
export interface LoginParams {
  email: string
  password: string
}

/**
 * @description: 获取用户信息
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number
}

/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  createdAt: string
  id: number
  isDel: number
  isSuper: number
  platform: null
  token: string
  updatedAt: string
  username: string
  userInfo: any
}

/**
 * @description: 获取用户信息返回值
 */
export interface GetUserInfoByUserIdModel {
  roles: { roleName: string; value: RoleEnum }[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 介绍
  desc?: string
}
