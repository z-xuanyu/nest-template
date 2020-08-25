import { ApiTags, ApiProperty } from '@nestjs/swagger';

export class regDto {
  @ApiProperty({ title: '用户名' })
  name: string;

  @ApiProperty({ title: '邮箱' })
  email: string;

  @ApiProperty({ title: '密码' })
  password: string;
}
