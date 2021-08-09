/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-26 10:56:04
 * @LastEditTime: 2021-08-09 14:24:26
 * @Description: Modify here please
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendEmailService } from './send-email.service';


@ApiTags('邮件服务')
@Controller('send-email')
export class SendEmailController {
    constructor(private readonly sendEmailSever: SendEmailService) { }


    @Get()
    @ApiOperation({ summary: "发送邮件" })
    sendEmail(): string {
        this.sendEmailSever.sendEmail();
        return 'ok'
    }
}
