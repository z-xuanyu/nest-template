/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-26 10:55:52
 * @LastEditTime: 2021-07-26 12:20:09
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { SendEmailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import path = require('path');
@Module({
  imports:[
    MailerModule.forRoot({
        transport: {
            host: 'smtp.exmail.qq.com', //邮箱服务器地址
            port: 465, //服务器端口 默认 465
            auth: {
                user: '812006298@qq.com',//你的邮箱地址
                pass: 'fttlcuxaqxeobdhg'
            }
        },
        preview: true,//是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
        defaults: {
            from: '测试邮件 <812006298@qq.com>' //发送人 你的邮箱地址
        },
        template: {
            dir: path.join(__dirname, '/send-email/template'),//这里就是你的ejs模板文件夹路径
            adapter: new PugAdapter(),
            options: {
                strict: true //严格模式
            }
        }
    })
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
