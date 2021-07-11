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
    // InitDbModule,   // 打开注释，重新启动项目 yarn start -w admin 初始化数据库
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
