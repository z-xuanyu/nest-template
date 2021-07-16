/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-16 11:01:26
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { CommonModule } from '@app/common';
import { AdministratorModule } from './administrator/administrator.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { InitDbModule } from './init-db/init-db.module';

@Module({
  imports: [
    DbModule,
    CommonModule,
    AdministratorModule,
    AuthModule,
    RoleModule,
    MenuModule,
    // InitDbModule  // 打开注释，重新启动项目 yarn start -w admin 初始化数据库
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
