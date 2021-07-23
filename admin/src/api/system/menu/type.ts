/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 15:11:06
 * @LastEditTime: 2021-07-19 16:16:13
 * @Description: Modify here please
 */

export interface MenuItem {
  _id: string | number;
  name: string;
  parentId: string | null;
  url: string;
  icon: string;
  sort: number;
  keepAlive: number;
}
