/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-26 10:56:04
 * @LastEditTime: 2021-07-28 14:22:43
 * @Description: Modify here please
 */
import { Controller, Get } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendEmailService } from './send-email.service';


@ApiTags('邮件服务')
@Controller('send-email')
export class SendEmailController {
    constructor(private readonly sendEmailSever: SendEmailService, private schedulerRegistry: SchedulerRegistry) { }


    @Get()
    @ApiOperation({summary:"发送邮件"})
    sendEmail(): string {
        this.sendEmailSever.sendEmail();
        return 'ok'
    }

    
    // @Get('start')
    // start():string{
    //     // const job = this.schedulerRegistry.getInterval('xuanyu');
    //     // job.start();
    //     return "任务开始"
    // }

    // @Get('stop')
    // stop():string{
    //     const job = this.schedulerRegistry.getInterval('xuanyu');
    //     clearInterval(job)
    //     return "任务停止"
    // }
}
