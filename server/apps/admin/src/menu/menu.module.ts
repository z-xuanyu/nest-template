import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';

@Module({
  controllers: [MenuController]
})
export class MenuModule {}
