/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-27 16:01:13
 * @LastEditTime: 2021-08-09 14:17:46
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
    controllers:[UserController]
})
export class UserModule {}
