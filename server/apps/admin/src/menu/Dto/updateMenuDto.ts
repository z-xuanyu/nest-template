import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  
  @ApiProperty({ title: '菜单名称' })
  name: string;

  @ApiProperty({ title: '父级菜单id(上级菜单)' })
  parentId?: string;

  @ApiProperty({ title: '菜单路径' })
  url: string;

  @ApiProperty({ title: '小图标' })
  icon: string;

  @ApiProperty({ title: '排序' })
  sort: number;

  @ApiProperty({ title: '组件keepAlive缓存' })
  keepAlive: number;
}
