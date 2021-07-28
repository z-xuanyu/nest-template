/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-28 13:51:29
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { MulterModule } from '@nestjs/platform-express';
import MAO = require('multer-aliyun-oss');
@Module({
  imports:[
    // 异步加载
    MulterModule.registerAsync({
      useFactory(){
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService]
})
export class AdministratorModule {}
