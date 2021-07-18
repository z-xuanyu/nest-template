import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/menu/roleMenus',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
