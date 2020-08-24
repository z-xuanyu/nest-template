import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';

@Module({
  controllers: [AdministratorController]
})
export class AdministratorModule {}
