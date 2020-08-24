import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({ title: '邮箱' })
  email: string;

  @ApiProperty({ title: '密码' })
  password: string;
}
