/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-27 10:03:25
 * @LastEditTime: 2021-07-27 10:10:56
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksController } from './tasks.controller';

@Module({
  imports:[ScheduleModule.forRoot()],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
