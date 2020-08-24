import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { CommonModule } from '@app/common';
import { AdministratorModule } from './administrator/administrator.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, CommonModule, AdministratorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
