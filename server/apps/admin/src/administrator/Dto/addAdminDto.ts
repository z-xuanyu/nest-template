import { ApiProperty } from '@nestjs/swagger';

export class addAdminDto {
  @ApiProperty({ title: '管理员名称' })
  name: string;

  @ApiProperty({ title: '邮箱' })
  email: string;

  @ApiProperty({ title: '密码' })
  password: string;

  @ApiProperty({ title: '角色' })
  roleIds: Array<string>;
}
