import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService]
})
export class AdministratorModule {}
