/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-26 10:56:15
 * @LastEditTime: 2021-07-26 12:11:35
 * @Description: Modify here please
 */
import { Injectable } from '@nestjs/common';
import { MailerService  } from '@nestjs-modules/mailer';
@Injectable()
export class SendEmailService {
  constructor(private readonly emailService: MailerService) { };
  sendEmail(): void {
    this.emailService.sendMail({
      to: '969718197@qq.com', // 接收信息的邮箱
      from: '812006298@qq.com', // 要发送邮件的邮箱
      subject: 'Love You √',
    //   html: '<b>welcome !</b><br/><p>测试邮件发送成功sfsfsaf!</p>',
      template: 'email',
    }).then(() => {
      console.log("邮件发送成功！")
    }).catch(() => {
      console.log("邮件发送失败")
    })
    // console.log(process)
  }
}
