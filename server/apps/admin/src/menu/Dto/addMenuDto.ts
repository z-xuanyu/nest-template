/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-19 11:47:10
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class AddMenuDto {
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

  @ApiProperty({title: "组件名称"})
  componentName?: string
}
