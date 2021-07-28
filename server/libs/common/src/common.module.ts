/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-28 13:51:20
 * @Description: Modify here please
 */
import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'libs/db';
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN }
        };
      },
    }),
    DbModule,
    
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
