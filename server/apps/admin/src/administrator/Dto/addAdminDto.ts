import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class addAdminDto {
  @ApiProperty({ title: '管理员名称' })
  @IsString({ message: '用户名必须为字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string;

  @ApiProperty({ title: '邮箱' })
  @IsString({ message: '邮箱不能为空' })
  @IsEmail({ ignore_max_length: true }, { message: '请输入正确的邮箱' })
  email: string;

  @ApiProperty({ title: '密码' })
  password: string;

  @ApiProperty({ title: '角色' })
  roleIds: Array<string>;
}
