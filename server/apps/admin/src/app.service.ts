import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nestjs通用模板(聚成jwt、mongodb、用户密码加密、swaggerAPI文档等) xuanyu<969718197@qq.com> ';
  }
}
