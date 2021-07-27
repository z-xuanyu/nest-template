/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-27 10:03:49
 * @LastEditTime: 2021-07-27 10:45:47
 * @Description: Modify here please
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    // @Cron('45 * * * * *',{ name:'xuanyu' })
    // // handleCron() {
    // //     this.logger.debug('每一分钟的第45秒执行');
    // // }
    // triggerNotifications() {
    //     this.logger.debug('测试任务');
    // }


    // @Interval( 'xuanyu', 2000)
    // handleInterval() {
    //     this.logger.debug('每2秒打一次电话');
    // }

    // @Timeout( 'xuanyu', 5000)
    // handleTimeout() {
    //     this.logger.debug('5秒后呼叫一次');
    // }
}
