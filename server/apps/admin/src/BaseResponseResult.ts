/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 10:51:01
 * @LastEditTime: 2021-08-09 10:55:50
 * @Description: Modify here please
 */
// 基础返回
export class BaseResponseResult<T>{
    code: number;
    result: T;
    message: string
}

// 表格返回
export class TableResponseResult<T> {
    items:Array<T>;
    total: number
}