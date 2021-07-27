/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-27 15:27:56
 * @Description: Modify here please
 */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
const PORT = process.env.ADMIN_PORT || 8888;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('管理端API接口文档')
    .setDescription('这是一个管理端API接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  // 访问频率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 500, // 限制15分钟内最多只能访问500次
    }),
  );
  // Web漏洞的防护
  app.use(helmet());
  await app.listen(PORT);

  console.log(`http://localhost:${PORT}/api-docs`);
}
bootstrap();
