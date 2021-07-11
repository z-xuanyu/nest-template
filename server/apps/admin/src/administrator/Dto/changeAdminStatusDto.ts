import { ApiProperty } from '@nestjs/swagger';

export class changeAdminStatusDto {
  @ApiProperty({ title: '管理员id' })
  adminId: string;

  @ApiProperty({ title: '状态' })
  status: boolean;
}
