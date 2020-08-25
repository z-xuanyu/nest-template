import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from 'libs/db';
import { CommonModule } from '@app/common';
@Module({
  imports: [UserModule, AuthModule, DbModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
