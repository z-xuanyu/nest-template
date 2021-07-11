import { ApiProperty } from '@nestjs/swagger';

export class editRoleDto {
  @ApiProperty({ title: '角色名称' })
  name: string;

  @ApiProperty({ title: '角色描述' })
  description: string;

  @ApiProperty({ title: '角色权限菜单' })
  menuIds?: Array<string | object >;
}
