/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 14:59:32
 * @LastEditTime: 2021-07-19 16:17:09
 * @Description: Modify here please
 */
export interface DataItem {
  _id: string | object | number;
  name: string;
  icon: string;
  keepAlive: boolean;
  sort: number;
  componentName: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string | null;
  children?: DataItem[] | null;
}

export interface MenuItem {
  _id: string | number;
  name: string;
  parentId: string | null;
  url: string;
  icon: string;
  sort: number;
  keepAlive: number;
}
