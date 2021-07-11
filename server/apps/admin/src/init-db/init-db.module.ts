import { Module } from '@nestjs/common';
import { InitDbService } from './init-db.service';

@Module({
  providers: [InitDbService]
})
export class InitDbModule {}
